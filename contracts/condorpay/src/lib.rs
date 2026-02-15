#![no_std]

mod contract;
mod events;
mod methods;
mod storage;
mod error;
// #[cfg(test)]
// mod tests;
// mod utils;

pub use crate::contract::Contract;
