import styled from 'styled-components'

export const ViewSplit = styled.div`
  display: flex;
  height: calc(100vh - 22px);
  align-items: stretch;
  justify-content: flex-end;
`

export const Panel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

export const SearchArea = styled.div`
  margin: 0;
  padding: 0;
  height: 50px;
`

export const SearchInput = styled.input`
  height: 30px;
  width: 30%;

  margin: 10px;
  padding: 0.6rem 2rem 0.6rem 1rem;

  color: white;
  background-color: #191e23;

  text-align: left;
  border-radius: 6rem;
  border: 1px solid #4e5966;

  font-size: 0.9rem;
  transition: 0.3s ease all;

  &:focus {
    border-color: white;
    transition: 0.3s ease all;
  }
  &:focus + span {
    color: white;
    transition: 0.3s ease all;
  }
`

export const InputIconSpan = styled.span`
  position: relative;
  color: #4e5966;
  right: 2.5rem;
  pointer-events: none;
`

export const ItemContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: stretch;
  width: 100%;

  flex-grow: 1;
  overflow: auto;

  /* background-color: #aaa; */
`

export const LoadingContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  /* background-color: #aaa; */
`
