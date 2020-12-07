import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Link, Redirect } from "react-router-dom";
import { Button, Segment, Header, Confirm } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { listenToEvents } from "../eventAction";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryData } from "../../../app/api/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import {
  addEventToFirestore,
  cancelEventToggle,
  listenToEventFromFirestore,
  updateEventInFirestore,
} from "../../../app/firestore/firestoreService";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import {toast} from "react-toastify";

export default function EventForm({ match, history }) {
  const dispatch = useDispatch();
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const selectedEvent = useSelector((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  );
  const { loading, error } = useSelector((state) => state.async);
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

  async function handleCancelToggle(event) {
    setConfirmOpen(false);
    setLoadingCancel(true);
    try{
      await cancelEventToggle(event);
      setLoadingCancel(true);
    } catch (error) {
      setLoadingCancel(true);
      toast.error(error.message);
    }
  }

  useFirestoreDoc({
    shouldExecute: !!match.params.id,
    query: () => listenToEventFromFirestore(match.params.id),
    data: (event) => dispatch(listenToEvents([event])),
    deps: [match.params.id, dispatch],
  });

  if (loading)
    return <LoadingComponent content="Loading event..." />;
  if (error) return <Redirect to="/error" />;

  return (
    <Segment clearing>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            selectedEvent
              ? await updateEventInFirestore(values)
              : addEventToFirestore(values);
            history.push("/events");
          } catch (error) {
            toast.error(error.message);
            setSubmitting(false);
          }
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
            {selectedEvent &&
            <Button
              loading={loadingCancel}
              type="button"
              floated="left"
              content={selectedEvent.isCancelled ? 'Reactivate Event': 'Cancel Event'}
              color={selectedEvent.isCancelled ? 'pink': 'teal'}
              onClick={() => setConfirmOpen(true)}
            />}
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
      <Confirm
        content={selectedEvent?.isCancelled ? 'This will reactivate the event - is that ok?' :
      'This will cancel the event - are you sure?'}
      open={confirmOpen}
      onCancel={() => setConfirmOpen(false)}
      onConfirm={() => handleCancelToggle(selectedEvent)}
      />
    </Segment>
  );
}
