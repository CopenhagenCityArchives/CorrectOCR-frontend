export interface IDocStats {
    index_count: number;
    token_count: number;
    hyphenated_count: number;
    discarded_count: number;
    error_count: number;
    corrected_count: number;
    corrected_by_annotator_count: number;
    corrected_by_model_count: number;
    uncorrected_count: number;
    empty_gold: number;
	done: boolean;
}

