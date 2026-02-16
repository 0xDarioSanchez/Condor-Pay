#[soroban_sdk::contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum Error {
    // Contract
    Unauthorized = 1,
    AdminNotSet = 2,
    InvalidInput = 3,
    NoBalanceToTransfer = 7,
    InsufficientPoolBalance = 8,

    // Borrowers
    BorrowerNotFound = 10,
    BorrowerAlreadyRegistered = 11,

    // Investors
    InvestorAlreadyRegistered = 20,
    InvestorNotFound = 21,

    // Invoices
    InvoiceAlreadyApproved = 30,
    InvalidInvoiceStatus = 31,
    InvoiceNotFound = 32,

    // Pools
    PoolNotFound = 40,
    PoolAlreadyExists = 41,

}
