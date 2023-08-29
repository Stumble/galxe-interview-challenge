// @ts-ignore
import { buildPoseidon, buildEddsa, EdDSA as RawEdDSA, EdDSASig as RawSig, Point as RawPoint } from "circomlibjs";
// @ts-ignore
import { getCurveFromName } from "ffjavascript";
import { describe, expect, it } from "vitest";

// Background:
// This is a coding interview question about knowledge of node, WASM and web-worker, HARD level.
// The first dependency is circomlibjs, which is a library for zkSNARKs, you don't need to know too deep about it.
// The second dependency is ffjavascript, which is a library for finite field arithmetic, where they uses
// WASM and web-worker to speed up the calculation.
// For this problem, you will need to dig into the source code of ffjavascript and its dependency potentially,
// to solve the below two problems.
// https://github.com/iden3/ffjavascript/blob/e03701dc11679f952454722bb053b7fa04e0fa8f/src/bn128.js#L8
// Node version: v18.17.0

describe("interview tests", () => {
  /*
   *   Problem.1 Fix the warning below.
   *   When you run npm run test, you will see this warning (correctness not affected):
   *   stderr | unknown test
   *   TypeError: The "id" argument must be of type string. Received undefined
   *       at new NodeError (node:internal/errors:405:5)
   *       at validateString (node:internal/validators:162:11)
   *       at Module.require (node:internal/modules/cjs/loader:1136:3)
   *       at require (node:internal/modules/cjs/helpers:110:18)
   *       at workerThread (*interview-frontend/galxe-frontend-interview/node_modules/web-worker/cjs/node.js:214:9)
   *       at Object.<anonymous> (*interview-frontend/galxe-frontend-interview/node_modules/web-worker/cjs/node.js:79:56)
   *       at Module._compile (node:internal/modules/cjs/loader:1256:14)
   *       at Object.Module._extensions..js (node:internal/modules/cjs/loader:1310:10)
   *       at Module.load (node:internal/modules/cjs/loader:1119:32)
   *       at Function.Module._load (node:internal/modules/cjs/loader:960:12) {
   *     code: 'ERR_INVALID_ARG_TYPE'
   *   }
  */
  it("question1: strange warning: The id argument must be of type string. Received undefined", async () => {
    const curve = await getCurveFromName("bn128", true);
    const poseidon = await buildPoseidon();
    const rv = poseidon([1, 2]);
    expect(rv).toEqual(curve.Fr.e("0x115cc0f5e7d690413df64c6b9662e9cf2a3617f2743245519e19607a4417189a"));
  });

  /*
   *   Problem.2 Fix the error below.
   */
  it("question2: TypeError: Worker is not a constructor", async () => {
    // minor change to the test above: change the second argument to getCurveFromName to false
    // then we got:
    // TypeError: Worker is not a constructor
    const curve = await getCurveFromName("bn128");
    const poseidon = await buildPoseidon();
    const rv = poseidon([1, 2]);
    expect(rv).toEqual(curve.Fr.e("0x115cc0f5e7d690413df64c6b9662e9cf2a3617f2743245519e19607a4417189a"));
  });

});


