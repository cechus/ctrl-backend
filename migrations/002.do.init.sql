CREATE TABLE ctrl2(
  ctrlId serial PRIMARY KEY,
  type VARCHAR(100) NOT NULL,
  duration BIGINT NOT NULL DEFAULT 0,
  createdAt TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updatedAt TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deletedAt TIMESTAMPTZ DEFAULT NULL
);