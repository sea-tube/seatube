import { create } from 'ipfs-http-client'
import * as IPFS from 'ipfs-core'
import OrbitDB from 'orbit-db'
import Identities from 'orbit-db-identity-provider'
import { ethers } from "ethers";

const LOCAL_IPFS_DAEMON = false

export default async function Orbit(provider) {

  // Init web3 wallet getting signer from provider
  const web3Provider = new ethers.providers.Web3Provider(provider);
  const wallet = web3Provider.getSigner();

  // Create identity using web3 provider
  const identity = await Identities.createIdentity({
    type: "ethereum",
    wallet,
  });

  // Connect to IPFS
  const ipfs = LOCAL_IPFS_DAEMON ? create(LOCAL_IPFS_DAEMON) : await IPFS.create()

  // Start OrbitDB with IFPS and web3 provider Identity
  const orbitdb = await OrbitDB.createInstance(ipfs, { identity })

  // Connect to database
  const db = await orbitdb.open('/orbitdb/zdpuAq3Qn12u31LsDJHvvmXVrowB6mQwVmmkY4n78eAb52YZJ/channel', {})

  // Listen for updates from peers
  db.events.on("write", out => {
    console.log(out)
  })

  // Listen for updates from peers
  db.events.on("replicated", () => {
    console.log(db.iterator({ limit: -1 }).collect())
  })

  await db.load()

  // Add an entry
  const hash = await db.add("new data example")
  console.log(hash)

  // Query
  const result = db.iterator({ limit: 1 }).collect()
  console.log(JSON.stringify(result, null, 2))
}
