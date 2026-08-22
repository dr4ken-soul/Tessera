#[starknet::contract]
mod TesseraLoan {
    use starknet::ContractAddress;

    #[storage]
    struct Storage {
        owner: ContractAddress,
        loan_count: u64,
        active_loans: u64,
        settled_repayments: u64,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        LoanCreated: LoanCreated,
        RepaymentSettled: RepaymentSettled,
        CreditProofRecorded: CreditProofRecorded,
        ReferenceIssued: ReferenceIssued,
    }

    #[derive(Drop, starknet::Event)]
    struct LoanCreated {
        #[key]
        loan_id: u64,
        repayment_count: u64,
    }

    #[derive(Drop, starknet::Event)]
    struct RepaymentSettled {
        #[key]
        loan_id: u64,
        due_index: u64,
    }

    #[derive(Drop, starknet::Event)]
    struct CreditProofRecorded {
        #[key]
        loan_count: u64,
        on_time: bool,
    }

    #[derive(Drop, starknet::Event)]
    struct ReferenceIssued {
        #[key]
        subject: ContractAddress,
        reference_id: u64,
    }

    #[constructor]
    fn constructor(ref self: ContractState, owner: ContractAddress) {
        self.owner.write(owner);
    }

    #[external(v0)]
    fn create_loan(ref self: ContractState, repayment_count: u64) -> u64 {
        assert(repayment_count > 0, 'repayments required');
        let loan_id = self.loan_count.read() + 1;
        self.loan_count.write(loan_id);
        self.active_loans.write(self.active_loans.read() + 1);
        self.emit(LoanCreated { loan_id, repayment_count });
        loan_id
    }

    #[external(v0)]
    fn settle_repayment(ref self: ContractState, loan_id: u64, due_index: u64) {
        assert(loan_id > 0, 'loan required');
        assert(due_index > 0, 'index required');
        self.settled_repayments.write(self.settled_repayments.read() + 1);
        self.emit(RepaymentSettled { loan_id, due_index });
    }

    #[external(v0)]
    fn record_credit_proof(ref self: ContractState, historical_loans: u64, on_time: bool) {
        self.emit(CreditProofRecorded { loan_count: historical_loans, on_time });
    }

    #[external(v0)]
    fn issue_reference(ref self: ContractState, subject: ContractAddress, reference_id: u64) {
        assert(reference_id > 0, 'reference required');
        self.emit(ReferenceIssued { subject, reference_id });
    }

    #[view]
    fn position(self: @ContractState) -> (u64, u64, u64) {
        (self.loan_count.read(), self.active_loans.read(), self.settled_repayments.read())
    }
}

#[starknet::contract]
mod TesseraAnonymizer {
    use starknet::ContractAddress;

    #[storage]
    struct Storage { owner: ContractAddress }

    #[constructor]
    fn constructor(ref self: ContractState, owner: ContractAddress) { self.owner.write(owner); }

    #[external(v0)]
    fn route_private_note(ref self: ContractState, note_commitment: felt252) -> felt252 { note_commitment }
}
