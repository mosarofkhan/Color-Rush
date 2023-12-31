import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import React, { Component } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

class PaletteMetaForm extends Component {
  state = {
    open: false,
    isEmojiOpen: false,
    newPaletteName: '',
  };

  componentDidMount() {
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>
      // eslint-disable-next-line react/destructuring-assignment
      this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  getEmoji = () => {
    this.setState({
      open: false,
      isEmojiOpen: true,
    });
  };

  savePalette = (emoji) => {
    const { newPaletteName } = this.state;
    const { submitPallete } = this.props;
    const newPalette = {
      paletteName: newPaletteName,
      emoji: emoji.native,
    };
    submitPallete(newPalette);
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, isEmojiOpen: false });
  };

  render() {
    const { open, newPaletteName, isEmojiOpen } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <Button
          className={classes.buttonFontsize}
          variant="contained"
          color="primary"
          onClick={this.handleClickOpen}
        >
          Save Palette
        </Button>
        <Dialog open={isEmojiOpen} onClose={this.handleClose}>
          <DialogTitle id="form-dialog-title">Choose a Palette Emoji</DialogTitle>
          <Picker
            title="Pick your emoji…"
            emoji="point_up"
            autoFocus
            enableFrequentEmojiSort
            onSelect={this.savePalette}
          />
        </Dialog>
        <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <ValidatorForm onSubmit={this.getEmoji}>
            <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter a new name for your beautiful Palette, make sure it&apos;s unique!
              </DialogContentText>

              <TextValidator
                autoComplete="off"
                placeholder="Palette name"
                value={newPaletteName}
                name="newPaletteName"
                onChange={this.handleChange}
                fullWidth
                margin="normal"
                validators={['required', 'isPaletteNameUnique']}
                errorMessages={['this field is required', 'palette name must be unique']}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button
                className={classes.buttonFontSize}
                variant="contained"
                color="primary"
                type="submit"
              >
                Save
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </div>
    );
  }
}

export default PaletteMetaForm;
