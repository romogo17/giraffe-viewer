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
  top: 0.08rem;
  /* pointer-events: none; */
`

export const ItemContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: stretch;
  width: 100%;

  /* This makes the container scrollable */
  overflow: auto;
  flex-grow: 1;
  /* box-shadow: inset 0px 11px 15px -5px #191e23,
    inset 0px -11px 15px -5px #191e23; */
`

export const CenteredContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`

export const ItemDiv = styled.div`
  height: 6rem;
  margin: 0 2rem;
  padding: 0 2rem;
  border-bottom: solid 1px #4e5966;

  flex: 0 0 auto; /* grow, shrink, basis */
  display: flex;
  align-items: stretch;

  & h2 {
    margin: 1rem 0 0.4rem 0;
  }
  & .uuid {
    color: #4e5966;
    margin: 0;
  }
`

export const Meta = styled.div`
  flex: ${props => props.flex};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1rem 5%;

  border: solid 1px ${props => props.color};
  color: ${props => props.color};
  border-radius: 0.7rem;
`
