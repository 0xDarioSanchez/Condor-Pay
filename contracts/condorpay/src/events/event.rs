use soroban_sdk::{Address, String, contractevent};

#[contractevent]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct InvoiceSetup {
    #[topic]
    pub invoice_id: u32,
    pub creator: Address,
}
