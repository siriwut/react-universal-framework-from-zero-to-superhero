import React from 'react'

About.getInitialProps = async () => {
  console.log('---getInitialProps---')
}

export default function About(props) {
  console.log(props)
  return 'About'
}
