// blockchain.ts — Seed data for UTXO Graph, Common-Input Clustering, Peel-Chain Hops, and VASP / FIU-IND

import { BlockchainUTXONode, BlockchainTransaction } from "@/types";
import { getTodayIso } from "@/lib/dateUtils";

export const BLOCKCHAIN_NODES: BlockchainUTXONode[] = [
  {
    id: "UTXO-01",
    address: "bc1q7vx4k9z809p023ml0194kfa90123kfa089a1",
    chain: "BTC",
    balance: "14.82 BTC",
    totalReceived: "142.50 BTC",
    actorId: "ACTOR-0941",
    actorAlias: "ViperKavach",
    clusterTag: "Cold Storage Consolidation",
    txCount: 48
  },
  {
    id: "UTXO-02",
    address: "bc1q89a1k092348mnz9012349012849012849102",
    chain: "BTC",
    balance: "0.45 BTC",
    totalReceived: "28.40 BTC",
    actorId: "ACTOR-0941",
    actorAlias: "ViperKavach",
    clusterTag: "Vaultmart Vendor Hot Escrow",
    txCount: 112
  },
  {
    id: "UTXO-03",
    address: "bc1qpeel77a90123489012849012849012849012",
    chain: "BTC",
    balance: "0.08 BTC",
    totalReceived: "6.20 BTC",
    actorId: "ACTOR-0941",
    actorAlias: "ViperKavach",
    clusterTag: "Peel Chain Hop #1 (Change Output)",
    peelHops: 1,
    txCount: 14
  },
  {
    id: "UTXO-04",
    address: "bc1qpeel99b10492849012849012849012849012",
    chain: "BTC",
    balance: "0.02 BTC",
    totalReceived: "4.10 BTC",
    actorId: "ACTOR-0941",
    actorAlias: "ViperKavach",
    clusterTag: "Peel Chain Hop #2 (Change Output)",
    peelHops: 2,
    txCount: 8
  },
  {
    id: "UTXO-05",
    address: "bc1qwasabi990128490128490128490128490123",
    chain: "BTC",
    balance: "0.00 BTC",
    totalReceived: "8.50 BTC",
    clusterTag: "Wasabi CoinJoin Mixer Pool (Flagged)",
    isMixer: true,
    txCount: 340
  },
  {
    id: "UTXO-06",
    address: "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy",
    chain: "BTC",
    balance: "1,240.50 BTC",
    totalReceived: "94,800.00 BTC",
    clusterTag: "CoinDCX Exchange Deposit Gateway",
    isVasp: true,
    vaspName: "CoinDCX (FIU-IND Reg #IND-VASP-2023-019)",
    txCount: 18420
  },
  {
    id: "UTXO-07",
    address: "bc1q9xy87z104pkj2094mnva90123kfa044b2",
    chain: "BTC",
    balance: "38.20 BTC",
    totalReceived: "84.10 BTC",
    actorId: "ACTOR-1102",
    actorAlias: "DesiCipher",
    clusterTag: "Ransomware Auction Escrow",
    txCount: 29
  },
  {
    id: "UTXO-08",
    address: "1NDyJtNTjmwk5xPNhjgAMu4HDHigtobu1s",
    chain: "BTC",
    balance: "8,920.00 BTC",
    totalReceived: "410,200.00 BTC",
    clusterTag: "Binance Global VASP Hot Wallet",
    isVasp: true,
    vaspName: "Binance Global (Offshore Compliance)",
    txCount: 92400
  }
];

export const BLOCKCHAIN_TRANSACTIONS: BlockchainTransaction[] = [
  {
    txid: "9f8a7c6b5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b",
    timestamp: getTodayIso(-2),
    fromAddress: "bc1q89a1k092348mnz9012349012849012849102",
    toAddress: "bc1q7vx4k9z809p023ml0194kfa90123kfa089a1",
    amount: "2.40000000",
    currency: "BTC",
    fee: "0.00014200",
    isPeelChange: false,
    isCommonInputCluster: true
  },
  {
    txid: "1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b",
    timestamp: getTodayIso(-6),
    fromAddress: "bc1q7vx4k9z809p023ml0194kfa90123kfa089a1",
    toAddress: "bc1qpeel77a90123489012849012849012849012",
    amount: "0.85000000",
    currency: "BTC",
    fee: "0.00009800",
    isPeelChange: true,
    isCommonInputCluster: false
  },
  {
    txid: "3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d",
    timestamp: getTodayIso(-12),
    fromAddress: "bc1qpeel77a90123489012849012849012849012",
    toAddress: "bc1qwasabi990128490128490128490128490123",
    amount: "0.75000000",
    currency: "BTC",
    fee: "0.00021000",
    isPeelChange: false,
    isCommonInputCluster: false,
    mixerService: "Wasabi CoinJoin Mixer Pool (Flagged)"
  },
  {
    txid: "5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f",
    timestamp: getTodayIso(-18),
    fromAddress: "bc1qwasabi990128490128490128490128490123",
    toAddress: "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy",
    amount: "0.74820000",
    currency: "BTC",
    fee: "0.00015000",
    isPeelChange: false,
    isCommonInputCluster: false,
    vaspEndpoint: "CoinDCX Exchange Deposit Gateway (FIU-IND Registered)"
  },
  {
    txid: "7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b",
    timestamp: getTodayIso(-24),
    fromAddress: "bc1q9xy87z104pkj2094mnva90123kfa044b2",
    toAddress: "1NDyJtNTjmwk5xPNhjgAMu4HDHigtobu1s",
    amount: "5.12000000",
    currency: "BTC",
    fee: "0.00032000",
    isPeelChange: false,
    isCommonInputCluster: true,
    vaspEndpoint: "Binance Global VASP Hot Wallet"
  }
];
