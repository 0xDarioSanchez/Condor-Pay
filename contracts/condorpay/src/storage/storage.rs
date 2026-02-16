use soroban_sdk::{Address, contracttype};

#[derive(Clone)]
#[contracttype]
pub enum DataKey {
    Admin,
    Token,                      // USDC token address (commented for XLM usage)
    USDCBalance,                // Total USDC balance held by the contract (commented for XLM usage)
    InvoiceCounter,             // Counter for generating unique invoice IDs
    PoolCounter,                // Counter for generating unique pool IDs
    Invoices(u32),              // Mapping of invoice_id to Invoice struct
    Investors(Address),         // Mapping of user address to Investor struct
    Borrowers(Address),         // Mapping of user address to Borrower struct
    Pools(u32),                 // Mapping of pool_id to Pool struct
    LpBalance(u32, Address),      // (pool_id, user) → balance
}
