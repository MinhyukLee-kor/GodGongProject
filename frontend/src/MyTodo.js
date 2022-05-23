import React from "react";
import MyTodoList from "./MyTodoList.js";
import MyTodoStudy from "./MyTodoStudy";
import styled from "styled-components";

let Wrapper = styled.div`
    margin: auto;
    width: 65vw
`

function MyTodo() {

    return (
        <Wrapper>
            <MyTodoStudy />
            <MyTodoList />
        </Wrapper>
    );
}

export default MyTodo;