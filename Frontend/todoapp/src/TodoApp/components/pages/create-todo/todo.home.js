import { Form, Button, Container} from 'react-bootstrap';
import useCheckAuth from '../../../customHooks/useCheckAuth';
export default function CreateTodo() {
    useCheckAuth();
  return (
    <div>
    <Container className="mt-5">
    <notification/>
        <h1 className="text-2xl font-bold mb-4 text-center">Create Todo</h1>
        <Form 
        // onSubmit={handleAddTask}
         className="mb-4">
            <Form.Group controlId="taskInput">
                <Form.Label>Task</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter your task"
                    // value={task}
                    // onChange={(e) => setTask(e.target.value)}
                    className="mb-2"
                />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-full">
                Add Task
            </Button>
        </Form>
        {/* <ul className="list-disc ml-5">
            {tasks.map((task, index) => (
                <li key={index} className="mb-2">{task}</li>
            ))}
        </ul> */}
    </Container>
</div>
  )
}
