export interface IToken {
    firstBest: string;
    firstProb: number;
    secondBest: string;
    secondProb: number;
    thirdBest: string;
    thirdProb: number;
    fourthBest: string;
    fourthProb: number;
    bin: number;
    decision: string;
    doc_ID: number;
    discarded: number;
    frame: number[];
    gold: string;
    heuristic: string;
    hyphenated: string;
    image_url: string;
    index: number;
    original: string;
    page: number;
    selection: string[];
    token_info: string[];
    token_type: string;
}
