CREATE TABLE token (
	kind VARCHAR(255) NOT NULL,
	doc_id VARCHAR(255) NOT NULL,
	doc_index INT NOT NULL,
	original VARCHAR(255) NOT NULL,
	gold VARCHAR(255),
	bin INT,
	heuristic VARCHAR(1),
	decision VARCHAR(255),
	selection VARCHAR(255),
	token_type VARCHAR(255),
	token_info TEXT,
	PRIMARY KEY (doc_id, doc_index, kind)
);

CREATE TABLE kbest (
	id PRIMARY KEY,
	doc_id VARCHAR(255) NOT NULL,
	doc_index INT NOT NULL,
	k INT NOT NULL,
	candidate VARCHAR(255) NOT NULL,
	probability float NOT NULL --,
--	FOREIGN KEY fk_kbest_token(doc_id, doc_index, kind) REFERENCES token(doc_id, doc_index, kind)
);

CREATE INDEX idx_token_doc_id_doc_index
	ON token(doc_id, doc_index);

CREATE INDEX idx_token_doc_id_kind
	ON token(doc_id, kind);

CREATE INDEX idx_kbest_doc_id_doc_index
	ON token(doc_id, doc_index);