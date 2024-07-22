const Voting = artifacts.require("Voting");

contract("Voting", (accounts) => {
  it("should initialize with correct candidate names", async () => {
    const instance = await Voting.deployed();
    const candidates = await instance.getCandidates();

    assert.equal(candidates[0].name, "Alice");
    assert.equal(candidates[1].name, "Bob");
    assert.equal(candidates[2].name, "Charlie");
  });

  it("should allow a voter to vote", async () => {
    const instance = await Voting.deployed();
    await instance.vote(0, { from: accounts[0] });

    const candidates = await instance.getCandidates();
    assert.equal(candidates[0].voteCount, 1);
  });

  it("should not allow double voting", async () => {
    const instance = await Voting.deployed();
    try {
      await instance.vote(0, { from: accounts[0] });
    } catch (error) {
      assert(error.message.includes("You have already voted."));
      return;
    }
    assert(false);
  });
});