export const ModalStyles = `
:host #modal {
  width: 30vw;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  padding: 1rem;
  border-radius: .5rem;
}
:host button {
  border: 1px solid var(--border-color);
  width: 100%;
  text-align: center;
  border-radius: .1rem;
  padding: .3rem;
  color: var(--text-color);
  cursor: pointer;
  margin-bottom: .5rem;
}
:host h2 {
  padding-bottom: .5rem;
  color: var(--text-color);
}

:host div {
  padding: 1rem;
}
`;