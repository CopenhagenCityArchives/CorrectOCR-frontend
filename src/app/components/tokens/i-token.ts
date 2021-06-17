export interface IKBest {
    candidate: string;
    probability: number
}

export interface IToken {
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
    k_best: {
        [ order: number ]: IKBest
    }
}
