import cuid from "cuid";
import React from "react";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import { Button, Segment, Header } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { createEvent, updateEvent } from "../eventAction";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryData } from "../../../app/api/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";

export default function EventForm({ match, history }) {
  const dispatch = useDispatch();
  const selectedEvent = useSelector((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  );
  const initialValues = selectedEvent ?? {
    title: "",
    category: "",
    description: "",
    city: "",
    venue: "",
    date: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("The title field is required!"),
    category: Yup.string().required("The category field is required!"),
    description: Yup.string().required("The description field is required!"),
    city: Yup.string().required("The city field is required!"),
    venue: Yup.string().required("The venue field is required!"),
    date: Yup.string().required("The date field is required!"),
  });

  return (
    <Segment clearing>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          selectedEvent
            ? dispatch(updateEvent({ ...selectedEvent, ...values }))
            : dispatch(
                createEvent({
                  ...values,
                  id: cuid(),
                  hostedBy: "Bob",
                  attendees: [],
                  hostPhotoURL: "/assets/user.png",
                })
              );
          history.push("/events");
        }}
      >
        {({ isSubmitting, dirty, isValid }) => (
          <Form className="ui form">
            <Header sub color="purple" content="Event Details" />
            <MyTextInput name="title" placeholder="Event Title" />
            <MySelectInput
              name="category"
              placeholder="Category"
              options={categoryData}
            />
            <MyTextArea name="description" placeholder="Description" rows={3} />
            <Header sub color="purple" content="Event Location Details" />
            <MyTextInput name="city" placeholder="City" />
            <MyTextInput name="venue" placeholder="Venue" />
            <MyDateInput
              name="date"
              placeholderText="Event Date"
              timeFormat="HH:mm"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm a"
            />

            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type="submit"
              floated="right"
              content="Submit"
              color="pink"
            />
            <Button
              disabled={isSubmitting}
              as={Link}
              to="/events"
              type="submit"
              floated="right"
              content="Cancel"
              color="purple"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
}
