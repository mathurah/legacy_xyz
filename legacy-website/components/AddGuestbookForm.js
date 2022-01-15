import React, { useState } from "react";

import {
  Button,
  Stack,
  Typography,
  FormControl,
  Input,
  FormHelperText,
  InputLabel,
} from "@mui/material";

function validURL(str) {
  var regex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  if (!regex.test(str)) {
    return false;
  } else {
    return true;
  }
}

const AddGuestListForm = ({ projectId, setProjectId, setState }) => {
  const [projectIdError, setProjectIdError] = useState('');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [twitter, setTwitter] = useState('');
  const [twitterError, setTwitterError] = useState('');
  const [website, setWebsite] = useState('');
  const [websiteError, setWebsiteError] = useState('');
  const [tags, setTags] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleProjectId = (e) => {
    const n = e.target.value;
    if (n.length > 15) {
      setProjectIdError('project id cannot exceed 15 characters');
    }
    else {
      setProjectIdError('');
      setProjectId(n)
    }
  }

  const handleName = (e) => {
    const n = e.target.value;
    if (n.length > 20) {
      setNameError('name cannot exceed 20 characters');
    }
    else {
      setNameError('');
      setName(n)
    }
  }

  const handleTwitter = (e) => {
    const n = e.target.value;
    if (n.length > 15) {
      setTwitterError('Twitter handles cannot exceed 15 characters');
    }
    else {
      setTwitterError('');
      setTwitter(n)
    }
  }

  const handleWebsite = (e) => {
    const n = e.target.value;
    setWebsite(n)
    if (n && !validURL(n)) {
      setWebsiteError('Please enter valid url');
    }
    else {
      setWebsiteError('');
    }
  }

  const handleTag = (e) => {
    setTags(e.target.value);
  }

  const handleSubmit = async () => {
    if (!projectId || !name) {
      setSubmitError('Project id and name are required');
      return;
    }
    setSubmitting(true);
    try {
      await fetch('https://legacy-xyz.vercel.app/api/project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(
          {
            projectId,
            projectName: name,
            projectTwitter: twitter,
            projectWebsite: website,
            projectTags: tags,
          }
        )
      })
      setSubmitError('');
      setState(1);
    } catch (err) {
      setSubmitError('We had trouble adding your project. Please try again.', err);
    }
    setSubmitting(false);
  };

  return (
    <Stack alignItems="left" pl={20} pr={20} pt={10} spacing={4}>
      <Typography align="center" variant="h2" sx={{ pt: 2 }}>
        Add a guestbook to your website
      </Typography>
      <Typography align="center" variant="body1" sx={{ color: '#4F4F4F' }}>
        Fill the form below to allow users to discover and sign your website as
        part of their digital legacy
      </Typography>
      <FormControl onChange={handleProjectId}>
        <InputLabel htmlFor="my-input">Project ID</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" value={projectId} />
        {projectIdError && <Typography variant="caption" sx={{ color: 'red' }}>{projectIdError}</Typography>}
        <FormHelperText id="my-helper-text">
          Create a unique project ID (could be your wallet address)
        </FormHelperText>
      </FormControl>
      <FormControl onChange={handleName}>
        <InputLabel htmlFor="my-input">Project Name</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" value={name} />
        {nameError && <Typography variant="caption" sx={{ color: 'red' }}>{nameError}</Typography>}
        <FormHelperText id="my-helper-text">
          What do you want your {`guestbook's`} display name to be?
        </FormHelperText>
      </FormControl>
      <FormControl onChange={handleTwitter}>
        <InputLabel htmlFor="my-input">Project Twitter</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" value={twitter} />
        {twitterError && <Typography variant="caption" sx={{ color: 'red' }}>{twitterError}</Typography>}
        <FormHelperText id="my-helper-text">
          Add your twitter handle if you have one!
        </FormHelperText>
      </FormControl>
      <FormControl onChange={handleWebsite}>
        <InputLabel htmlFor="my-input">Project Website</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" value={website} />
        {websiteError && <Typography variant="caption" sx={{ color: 'red' }}>{websiteError}</Typography>}
      </FormControl>
      <FormControl onChange={handleTag}>
        <Stack>
          <InputLabel htmlFor="my-input">Project Tags</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" />
          <FormHelperText id="my-helper-text">
            Add comma-separated tags that relate to your project (ex. crypto, wriitng, personal website)
          </FormHelperText>
        </Stack>
      </FormControl>
      {submitError && <Typography variant="caption" sx={{ color: 'red' }}>{submitError}</Typography>}
      <Stack alignItems="center">
        <Button
          onClick={handleSubmit}
          variant="contained"
          size="large"
          disabled={submitting}
          sx={{
            border: "4px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "16px",
            width: "150px",
            height: "60px",
            backgroundColor: "#3f8758",
          }}
        >
          Submit
        </Button>
      </Stack>
    </Stack>
  );
};
export default AddGuestListForm;
