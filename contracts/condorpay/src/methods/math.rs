const YEAR_DAYS: i128 = 365;
const RATE_SCALE: i128 = 10_000;

fn get_rate_for_days(days: u32, yearly_rate: i128,) -> i128 {
    yearly_rate * (days as i128) / YEAR_DAYS
}

// Return the discount rate for a given amount and yearly rate
pub fn discounted_amount(
    amount: i128,
    yearly_rate: i128, // 3000 = 30%
    days: u32,
) -> i128 {

    let discount =
        amount * yearly_rate * (days as i128)
        / (YEAR_DAYS * RATE_SCALE);

    amount - discount
}

pub fn calculate_lp_tokens(amount: i128) -> i128 {
    // For simplicity, we can assume that 1 XLM invested gives 1 LP token (was USDC)
    amount
}