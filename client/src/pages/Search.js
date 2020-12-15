// react imports
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// local imports
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import { Input, TextArea, FormBtn } from "../components/Form";

// api imports
import API from "../utils/API";
// ## css goes here


function Search(props) {
  const [books, setBooks] = useState([])
  const [formObject, setFormObject] = useState({})

  // When this component mounts, grab the book with the _id of props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc

  // useEffect(() => {
  //   API.getBook(id)
  //     .then(res => setBook(res.data))
  //     .catch(err => console.log(err));
  // }, [])

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.title) {
      API.searchBooks(formObject.title)
      .then(res => setBooks(res.data.items))
      .catch(err => console.log(err))
    }
  };


  // add a card and button to save searched books

  // API.saveBook({
  //   title: formObject.title,
  //   author: formObject.author,
  //   synopsis: formObject.synopsis
  // })
  //   .then(res => loadBooks())
  //   .catch(err => console.log(err));

  return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <form>
                <Input
                  onChange={handleInputChange}
                  name="title"
                  placeholder="Title (required)"
                />
                <FormBtn
                  disabled={!(formObject.title)}
                  onClick={handleFormSubmit}
                >
                  Search Google Books
                </FormBtn>
              </form>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/books">Saved Books</Link>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            {books.map(book => (
              <article> 
                <h1>Synopsis</h1>
                <p>
                  {book.volumeInfo.description}
                </p>
              </article>
            ))}         
          </Col>
        </Row>
        
      </Container>
    );
  }


export default Search;
