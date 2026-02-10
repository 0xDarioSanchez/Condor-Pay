use super::{Invoice_status::InvoiceStatus, vote::Vote};
use crate::storage::{error::Error, storage::DataKey, vote::VoteData};
use soroban_sdk::{Address, BytesN, Env, String, Vec, contracttype};

#[derive(Clone)]
#[contracttype]
pub struct Invoice {
    pub project_id: u32,
    pub invoice_id: u32,
    pub able_to_vote: Vec<Address>,    // Judges who can vote
    pub voters: Vec<Address>,          // Judges who have committed
    pub vote_commits: Vec<BytesN<32>>, // Commit hashes
    pub votes: Vec<Vote>,              // Revealed votes
    pub invoice_status: InvoiceStatus,
    pub initial_timestamp: u64,
    pub finish_timestamp: Option<u64>,
    pub creator: Address,
    pub counterpart: Address,
    pub winner: Option<Address>,
    pub creator_proves: String,
    pub counterpart_proves: Option<String>,
    pub waiting_for_judges: bool,
    pub votes_for: u32,
    pub votes_against: u32,
    pub vote_data: VoteData,
    pub called_contract: Address,
}

pub(crate) fn get_invoice(env: &Env, invoice_id: u32) -> Result<Invoice, Error> {
    let key = DataKey::Invoices(invoice_id);

    env.storage()
        .instance()
        .get(&key)
        .ok_or(Error::InvoiceNotFound)
}

pub(crate) fn set_invoice(env: &Env, invoice_id: u32, invoice: Invoice) {
    let key = DataKey::Invoices(invoice_id);

    env.storage().instance().set(&key, &Invoice)
}
