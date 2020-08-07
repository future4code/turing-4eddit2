import React from 'react'
import { AwesomeButtonSocial } from 'react-awesome-button';
import AwesomeButtonStyles from 'react-awesome-button/src/styles/styles.scss'

const Share = (props) => {

  return <div className="share-button">
      <AwesomeButtonSocial
          key = {props.key}
          cssModule={AwesomeButtonStyles}
          type="facebook"
          url = 'http://bananinha-one.surge.sh/'
          username = {props.username}
          title = {props.title}
          text = {props.text}
          comentario = {props.commentsCount}
        />
        <AwesomeButtonSocial
            key = {props.key}
            cssModule={AwesomeButtonStyles}
            type="twitter"
            url = 'http://bananinha-one.surge.sh/'
            username = {props.username}
            title = {props.title}
            text = {props.text}
            comentario = {props.commentsCount}
        />
        <AwesomeButtonSocial
            key = {props.key}
            cssModule={AwesomeButtonStyles}
            type="instagram"
            url = 'http://bananinha-one.surge.sh/'
            username = {props.username}
            title = {props.title}
            text = {props.text}
            comentario = {props.commentsCount}
        />
         <AwesomeButtonSocial
            key = {props.key}
            cssModule={AwesomeButtonStyles}
            type="github"
            url = 'http://bananinha-one.surge.sh/'
            username = {props.username}
            title = {props.title}
            text = {props.text}
            comentario = {props.commentsCount}
        />
        <AwesomeButtonSocial
            key = {props.key}
            cssModule={AwesomeButtonStyles}
            type="linkedin"
            url = 'http://bananinha-one.surge.sh/'
            username = {props.username}
            title = {props.title}
            text = {props.text}
            key = {props.id}
            comment = {props.text}
            username = {props.username}
            comentario = {props.commentsCount} 
        />

  </div>
}

export default Share 