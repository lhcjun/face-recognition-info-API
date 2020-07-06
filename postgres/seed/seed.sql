BEGIN TRANSACTION;

-- Only for testing purposes, this file will add dummy data.
INSERT into users (name, email, entries, joined, age, pet) values ('Claire', 'claire@gmail.com', 3, '2020-06-01', 11, 'Owl');
INSERT into login (hash, email) values ('$2b$10$nl6gKtPUlLFSldGJGkmO3.10LBgBnEV1F2IfrSAGxuGrmDnUJ6BLC', 'claire@gmail.com');

COMMIT;