#![no_main]

#[path = "../../tests/support/invariants.rs"]
mod invariants;

libfuzzer_sys::fuzz_target!(|source: &str| {
    invariants::source_contract(source);
});
