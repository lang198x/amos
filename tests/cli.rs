use std::process::Command;

fn command() -> Command {
    Command::new(env!("CARGO_BIN_EXE_lang198x-amos"))
}

#[test]
fn cli_and_library_share_the_supported_boundary() -> Result<(), Box<dyn std::error::Error>> {
    let root = env!("CARGO_MANIFEST_DIR");
    let good = command()
        .args([
            "check",
            "--profile",
            "amos-pro-2.00-observed",
            &format!("{root}/corpus/opening/sources/message.amos.txt"),
        ])
        .output()?;
    assert!(good.status.success());
    assert!(String::from_utf8_lossy(&good.stdout).contains("native compatibility not established"));
    let bad = command()
        .args([
            "check",
            "--profile",
            "amos-pro-2.00-observed",
            &format!("{root}/corpus/opening/sources/misspelt-command.amos.txt"),
        ])
        .output()?;
    assert_eq!(bad.status.code(), Some(2));
    assert!(String::from_utf8_lossy(&bad.stderr).contains(":2:1: unsupported:"));
    Ok(())
}

#[test]
fn profile_and_usage_errors_are_nonzero() -> Result<(), Box<dyn std::error::Error>> {
    let source = format!(
        "{}/corpus/opening/sources/message.amos.txt",
        env!("CARGO_MANIFEST_DIR")
    );
    assert_eq!(
        command()
            .args(["check", "--profile", "latest", &source])
            .status()?
            .code(),
        Some(3)
    );
    assert_eq!(command().arg("check").status()?.code(), Some(64));
    assert!(command().arg("--help").status()?.success());
    Ok(())
}
