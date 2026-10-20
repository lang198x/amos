use lang198x_amos::{CheckStatus, Profile, check};

#[test]
fn no_unknown_release_or_extension_silently_becomes_pro() {
    for id in ["", "latest", "creator-1.36", "easy-1.01", "pro-1.12"] {
        assert_eq!(
            check(
                "End",
                &Profile {
                    id,
                    extensions: &[]
                }
            )
            .status,
            CheckStatus::UnknownCompatibility
        );
    }
    assert_eq!(
        check(
            "End",
            &Profile {
                id: "amos-pro-2.00-observed",
                extensions: &["unqualified-extension"]
            }
        )
        .status,
        CheckStatus::UnknownCompatibility
    );
}

#[test]
fn binary_controls_and_unfinished_strings_never_pass() {
    let profile = Profile {
        id: "amos-pro-2.00-observed",
        extensions: &[],
    };
    for source in ["AMOS Basic\0", "Print \"unfinished"] {
        assert_eq!(check(source, &profile).status, CheckStatus::Invalid);
    }
}

#[test]
fn hidden_controls_and_empty_colon_statements_cannot_pass() {
    let profile = Profile {
        id: "amos-pro-2.00-observed",
        extensions: &[],
    };
    for source in ["Print \"a\0b\"", "Rem note\0", "'note\0"] {
        assert_eq!(check(source, &profile).status, CheckStatus::Invalid);
    }
    for source in [":", ":End", "End::"] {
        assert_eq!(check(source, &profile).status, CheckStatus::Unsupported);
    }
}
