import React, { Component } from 'react'
import {Card,Row,Col, Modal} from 'antd'
export class Gallery extends Component {
    state={
        visible:false
    }
    openGallery=(imgSrc)=>{
        this.setState({
            visible:true,
            currentImg:'/gallery/'+imgSrc
        })
    }
    render() {
        const imgs=[
            ['1.png','2.png','3.png','4.png','5.png'],
            ['6.png','7.png','8.png','9.png','10.png'],
            ['11.png','12.png','13.png','14.png','15.png'],
            ['16.png','17.png','18.png','19.png','20.png']
            
        ]
        const imgList=imgs.map((list)=>list.map((item)=> 
              <Card 
              cover={<img src={'/gallery/'+item}/>} onClick={()=>this.openGallery(item)}
              >
                  <Card.Meta
                  title="React Admin"
                  description="I Love"
                  />
              </Card>
         ))
        return (
            <div>
               <Row>
                   <Col md={6}>
                       {imgList[0]}
                   </Col>
                   <Col md={6}>
                       {imgList[1]}
                   </Col>
                   <Col md={6}>
                       {imgList[2]}
                   </Col>
                   <Col md={6}>
                       {imgList[3]}
                   </Col>

               </Row> 
               <Modal
                width={300}
                height={500}
                visible={this.state.visible}
                title="图片画廊"
                onCancel={()=>{
                    this.setState({
                        visible:false
                    })
                }}
                footer={null}
                >
                    <img src={this.state.currentImg} alt="" style={{width:'100%'}} />
                </Modal>

            </div>
        )
    }
}

export default Gallery
