interface IToken {
    firstBest:  string,
    firstProb:  number,
    secondBest: string,
    secondProb: number,
    thirdBest:  string,
    thirdProb:  number,
    fourthBest: string,
    fourthProb: number,
    bin:        number,
    decision:   string,
    doc_ID:     number,
    gold:       string,
    heuristic:  string,
    hyphenated: string,
    index:      number,
    original:   string,
    selection:  string[],
    token_info: string[],
    token_type: string,
    image_url:  string

}
