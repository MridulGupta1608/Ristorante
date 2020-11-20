import React, { Component } from 'react';
import { Card, CardBody, CardText, CardImg, CardTitle, Breadcrumb,BreadcrumbItem,Button, Label, Col, Row , Modal, ModalHeader,ModalBody} from 'reactstrap';
import { Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);



    export class CommentForm extends Component {
        
            
            constructor(props){
                super(props);    

                this.state={
                    isModalOpen: false
                };

                
                this.handleSubmit = this.handleSubmit.bind(this);
                this.toggleModal = this.toggleModal.bind(this);
            }

            toggleModal(){
                this.setState({
                    isModalOpen: !this.state.isModalOpen
                  });
              }

            handleSubmit(values) {
                this.toggleModal();
                this.props.addComment(this.props.dishId, values.rating, values.author,values.comment);   
            }


        
        

            render(){
                return(
                    <div>
                        <div>
                        <Button  outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit comment</Button>
                        </div>
                        <div>
                        <Modal isOpen = {this.state.isModalOpen} toggle = {this.toggleModal}>
                        <ModalHeader>Comment</ModalHeader>
                            <ModalBody className="ml-2 mr-2"> 
                                <LocalForm onSubmit={(values) => this.handleSubmit(values)}> 
                                    
                                    <div className="form-group">
                                    <Row>
                                        <label htmlFor="rating">Rating: </label>
                                    </Row>
                                    <Row>
                                    <Control.select
                                        className=" col-sm-12"
                                        model=".rating"
                                        name="rating">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                    </Control.select>
                                    </Row>
                                    </div>

                                    <div className="form-group">
                                    <Row>
                                        <label htmlFor="author">Your Name:</label>
                                    </Row>
                                    <Row>
                                        <Control.text
                                            model=".author"
                                            className="form-control"
                                            placeholder="Your Name"
                                            id="author"
                                            validators = {{
                                                required,
                                                maxLength : maxLength(15),
                                                minLength: minLength(3)}}/> 
                                        
                                        <Errors 
                                            className="text-danger"
                                            model=".author"
                                            show="touched"
                                            messages={{
                                                required :' Required ',
                                                maxLength : ' Must be less than 15 character ',
                                                minLength : ' Must be greater than 3 character ',
                                            }}/>
                                    </Row>
                                    </div>

                                    <div className="form-group">
                                    <Row>
                                        <lable htmlFor="comment">Comment</lable>
                                    </Row>
                                    <Row>
                                        <Control.textarea
                                            className="form-control"
                                            model=".comment"
                                            name="comment"
                                            id="comment"
                                            rows="6"/>
                                    </Row>
                                    </div>

                                    <div className="form-group">
                                        <Row>
                                            <Button className="submit" color="primary" value="submit">Submit</Button>
                                        </Row>
                                    </div>



                                </LocalForm>
                            </ModalBody>
                       </Modal>

                        </div>
                    </div>
                    
                    
                    
                );

            }
        }   



    function RenderComments({comments,addComment, dishId}) {
        if(comments == null) {
            return(
                <div>

                </div>
            )
        }
        else
        {
            const comment = comments.map(comment =>{
                return(
                    <li key={comment.id}>
                        <p>{comment.comment}</p>
                        <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US' ,{ year:'numeric',month:'long',day:'2-digit'}).format(new Date(comment.date))}</p>
                    </li>
                )
            })
            return(
                <div className="col-12 col-md-5 m-1">
                    <h4> Comments </h4>
                    <ul className="list-unstyled">{comment}</ul>
                    <CommentForm dishId={dishId} addComment={addComment} />
                </div>
            )
        }
    }


    function RenderDish({dish}){
        if(dish!=null)
        {
            return(
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle> 
                            <CardText>{dish.description}</CardText>
                            
                        </CardBody>
                    </Card>
                </div>
                
            );
        }
        else
        {
            return(
                <div>
                </div>
            );
        }
       
    }

    const DishDetail = (props) => {
        
        
        
        return (
          <div className="container">
              <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
            <div className="row">
            <RenderDish dish={props.dish}/>
            <RenderComments comments={props.comments}
                addComment={props.addComment}
                dishId= {props.dish.id}/>
            
            </div>
          </div>
        );
    }


export default DishDetail;