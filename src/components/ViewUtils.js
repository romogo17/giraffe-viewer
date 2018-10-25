import styled from 'styled-components'

export const ViewSplit = styled.div`
  display: flex;
  height: calc(100vh - 22px);
  align-items: stretch;
  justify-content: flex-end;

  &.instance {
    justify-content: flex-start;
  }
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

  &.instance {
    flex: none;
    width: 300px;
  }

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

  &.instance {
    height: 250px;
    margin: 0 0.5rem;
    padding: 0 0.5rem;
  }

  flex: 0 0 auto; /* grow, shrink, basis */
  display: flex;
  align-items: stretch;
  /* flex-wrap: wrap; */

  & h2 {
    margin: 1rem 0 0.4rem 0;
  }

  transition: 0.3s ease all;
  &:hover {
    border-left: solid 4px #82d8d8;
    border-right: solid 4px #82d8d8;
  }

  & h2:hover {
    color: #82d8d8;
    cursor: pointer;
  }
`

export const Meta = styled.div`
  flex: ${props => props.flex};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1rem 5%;

  &.narrow {
    margin: 1rem 2%;
  }

  border: solid 1px ${props => props.color};
  color: ${props => props.color};
  border-radius: 0.7rem;
`

export const PaginationArea = styled.div`
  margin: 0;
  margin-left: 2rem;
  padding: 0;
  height: 50px;

  & ul {
    margin-top: 12;
    margin-bottom: 0;
  }

  .rc-pagination * {
    outline: none;
  }

  .rc-pagination-item {
    background-color: #191e23;
    border-color: #4e5966;
  }

  .rc-pagination-item a {
    color: #4e5966;
  }

  .rc-pagination-item:hover,
  .rc-pagination-item:hover a {
    border-color: #82d8d8;
    color: white;
  }

  .rc-pagination-item-active {
    background-color: #191e23;
    border-color: #82d8d8;
  }

  .rc-pagination-item-active a {
    color: white;
  }

  .rc-pagination-prev,
  .rc-pagination-next,
  .rc-pagination-prev a,
  .rc-pagination-next a {
    border: none;
    color: #4e5966;
  }

  .rc-pagination-jump-prev:after,
  .rc-pagination-jump-next:after {
    color: #4e5966;
  }

  .rc-pagination-jump-prev:hover:after,
  .rc-pagination-jump-next:hover:after {
    color: #82d8d8;
  }

  .rc-select-dropdown {
    background-color: #191e23;
    border-color: #4e5966;
    box-shadow: 0 0px 4px black;
  }

  li.rc-select-dropdown-menu-item {
    color: #4e5966;
  }

  li.rc-select-dropdown-menu-item-selected {
    color: white;
    background-color: #191e23;
  }

  li.rc-select-dropdown-menu-item:hover {
    color: white;
    background-color: #191e23;
  }

  .rc-select-selection {
    background-color: #191e23;
    border-color: #4e5966;
    color: #4e5966;
  }

  .rc-select-focused .rc-select-selection,
  .rc-select-enabled .rc-select-selection:hover,
  .rc-select-open .rc-select-selection {
    border-color: #82d8d8;
  }

  .rc-select-arrow b {
    border-color: #4e5966 transparent transparent transparent;
  }

  .rc-pagination-options {
    color: #4e5966;
  }

  .rc-pagination-options input[type='text'] {
    background-color: #191e23;
    border-color: #4e5966;
    color: white;
  }
`

export const ModalSplit = styled.div`
  display: flex;
`
