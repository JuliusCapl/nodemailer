import {Container, FormControl, FormLabel, Input, Heading, Textarea, FormErrorMessage, Button, useToast, Text} from '@chakra-ui/react'
import { useState } from 'react'
import { sendContactForm } from '../lib/api'

const initValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
}
const initState = {values:initValues}

const index = () => {

const toast = useToast()
const [state, setState] = useState(initState)
const [touched, setTouched] = useState({})
const {values, isLoading, error} = state
const onBlur = ({target}) => setTouched((prev)=>({
  ...prev,
  [target.name]: true
}))
const handleChange = ({target}) => setState((prev)=> ({
  ...prev,
  values: {
    ...prev.values,
    [target.name]: target.value
  }
})) 

const onSubmit = async () => {
  setState((prev)=>({
    ...prev,
    isLoading: true
  }))
  try {
    sendContactForm(values)
    setTouched({})
    setState(initState)
    toast({
      title: 'Message Sent.',
      status: 'success',
      duration: 2000,
      position: 'top'
    })
  } catch (error) {
    setState((prev)=>({
      ...prev,
      isLoading: false,
      error: error.message
    }))
  }
}
  return (
    <Container maxWidth='450px' mt={8}>
      <Heading>Contact</Heading>
      {error&&(
        <Text color='red.300' my={4} fontSize='xl'>
          {error}
        </Text>
      )}
      <FormControl isRequired isInvalid={touched.name && !values.name} mb={3}>
        <FormLabel>Name</FormLabel>
        <Input
          type='text'
          name='name'
          errorBorderColor='red.300'
          value={values.name}
          onChange={handleChange}
          onBlur={onBlur}
        />
        <FormErrorMessage>Required</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={touched.email && !values.email} mb={3}>
        <FormLabel>Email</FormLabel>
        <Input
          type='email'
          name='email'
          errorBorderColor='red.300'
          value={values.email}
          onChange={handleChange}
          onBlur={onBlur}
        />
        <FormErrorMessage>Required</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={touched.subject && !values.subject} mb={3}>
        <FormLabel>Subject</FormLabel>
        <Input
          type='text'
          name='subject'
          errorBorderColor='red.300'
          value={values.subject}
          onChange={handleChange}
          onBlur={onBlur}
        />
        <FormErrorMessage>Required</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={touched.message && !values.message} mb={3}>
        <FormLabel>Message</FormLabel>
        <Textarea
          type='text'
          name='message'
          errorBorderColor='red.300'
          rows={4}
          value={values.message}
          onChange={handleChange}
          onBlur={onBlur}
        />
        <FormErrorMessage>Required</FormErrorMessage>
      </FormControl>
      <Button
        variant='outline'
        colorScheme='blue'
        isLoading={isLoading}
        //disabled not working
        disabled={!values.name || !values.email || !values.subject || !values.message}
        onClick={onSubmit}
        >
        Submit
      </Button>
    </Container>
  )
}

export default index