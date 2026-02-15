#[soroban_sdk::contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum Error {

    PoolNotFound = 10,
    InvestorNotFound = 11,
    InvoiceNotFound = 12,

    /// The contract has no balance to transfer to the guesser
    NoBalanceToTransfer = 20,
}
