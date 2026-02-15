use soroban_sdk::contracttype;

#[derive(Clone, PartialEq, Debug)]
#[contracttype]
pub enum InvoiceStatus {
    CREATED,
    APPROVED,
    REJECTED,
    //FUNDED,
    REFUNDING,
    REFUNDED,
}
