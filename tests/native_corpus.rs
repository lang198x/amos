use lang198x_amos::{CheckStatus, Profile, check};

#[test]
fn retained_native_inputs_have_independent_host_expectations() {
    let profile = Profile {
        id: "amos-pro-2.00-observed",
        extensions: &[],
    };
    for source in [
        include_str!("../corpus/probes/boundaries.amos.txt"),
        include_str!("../corpus/probes/comments.amos.txt"),
    ] {
        assert_eq!(
            check(source, &profile).status,
            CheckStatus::SupportedStructure
        );
    }
    // Print 2 is natively accepted, unlike the two extra-argument probes.
    // All three are beyond our implemented argument analysis.
    for source in [
        include_str!("../corpus/probes/unsupported-print.amos.txt"),
        include_str!("../corpus/probes/end-argument.amos.txt"),
        include_str!("../corpus/probes/wait-argument.amos.txt"),
    ] {
        assert_eq!(check(source, &profile).status, CheckStatus::Unsupported);
    }
}
