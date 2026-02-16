use soroban_sdk::{Address, Env};
use crate::storage::storage::DataKey;
use crate::error::Error;

pub(crate) fn get_admin(env: &Env) -> Option<Address> {
    let key = DataKey::Admin;

    env.storage().persistent().get(&key)
}

pub(crate) fn has_admin(env: &Env) -> bool {
    let key = DataKey::Admin;

    env.storage().persistent().has(&key)
}

pub(crate) fn set_admin(env: &Env, admin: &Address) {
    let key = DataKey::Admin;

    env.storage().persistent().set(&key, admin);
}

pub(crate) fn change_admin(env: Env, address: Address, new_admin: Address) -> Result<(), Error> {
    // Require authentication from the current admin
    address.require_auth();
    // Check if the caller is the admin
    let admin = match env.storage().persistent().get::<_, Address>(&DataKey::Admin) {
        Some(admin) => admin,
        None => return Err(Error::AdminNotSet),
    };
    if address != admin {
        return Err(Error::Unauthorized);
    }

    set_admin(&env, &new_admin);
    Ok(())
}