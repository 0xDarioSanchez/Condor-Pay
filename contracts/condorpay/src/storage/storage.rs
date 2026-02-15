use soroban_sdk::{Address, contracttype};

#[derive(Clone)]
#[contracttype]
pub enum DataKey {
    Admin,
    Token,                      // USDC token address
    USDCBalance,                // Total USDC balance held by the contract
    InvoiceCounter,             // Counter for generating unique invoice IDs
    Invoices(u32),              // Mapping of invoice_id to Invoice struct
    Investors(Address),         // Mapping of user address to Investor struct
    // Balances(Address),          // User balances
    // Pools(Pool),
}
