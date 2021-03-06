const BN256G2 = artifacts.require("BN256G2")
const BLSG2Helper = artifacts.require("BN256G2Helper")


contract("EcGasHelper - Gas consumption analysis", accounts => {
  // /////////////////////////////////////////// //
  // Check auxiliary operations for given curves //
  // /////////////////////////////////////////// //
  describe(`BN256G2 operations`, () => {
    const curveData = require(`./data/bn256_g2.json`)

    let library
    let helper
      before(async () => {
        library = await BN256G2.deployed()
        await BLSG2Helper.link(BN256G2, library.address)
        helper = await BLSG2Helper.new()
    })
    // Add
    for (const [index, test] of curveData.addition.valid.entries()) {
      it(`should add two points (${index + 1})`, async () => {
        let mul = await helper._bn128_g2_add.call([
          web3.utils.toBN(test.input.x1_re),
          web3.utils.toBN(test.input.x1_im),
          web3.utils.toBN(test.input.y1_re),
          web3.utils.toBN(test.input.y1_im),
          web3.utils.toBN(test.input.x2_re),
          web3.utils.toBN(test.input.x2_im),
          web3.utils.toBN(test.input.y2_re),
          web3.utils.toBN(test.input.y2_im)])
      assert.equal(mul[0].toString(), web3.utils.toBN(test.output.x_re).toString())
      assert.equal(mul[1].toString(), web3.utils.toBN(test.output.x_im).toString())
      assert.equal(mul[2].toString(), web3.utils.toBN(test.output.y_re).toString())
	    assert.equal(mul[3].toString(), web3.utils.toBN(test.output.y_im).toString())
      })
    }
    // Mul
    for (const [index, test] of curveData.multiplication.valid.entries()) {
      it(`should mul a point with a scalar (${index + 1})`, async () => {
        let mul = await helper._bn128_g2_multiply.call([
          web3.utils.toBN(test.input.k),
          web3.utils.toBN(test.input.x_re),
          web3.utils.toBN(test.input.x_im),
          web3.utils.toBN(test.input.y_re),
          web3.utils.toBN(test.input.y_im)])
      assert.equal(mul[0].toString(), web3.utils.toBN(test.output.x_re).toString())
      assert.equal(mul[1].toString(), web3.utils.toBN(test.output.x_im).toString())
      assert.equal(mul[2].toString(), web3.utils.toBN(test.output.y_re).toString())
	    assert.equal(mul[3].toString(), web3.utils.toBN(test.output.y_im).toString())
      })
    }
  })
})
