import { JoinRoom as JRoom } from "@/types";
import { Dispatch, FormEventHandler, SetStateAction } from "react";

const JoinRoom = ({
  onJoinRoom,
  onChangeFormValues,
  formValues,
  isError,
}: {
  onJoinRoom: FormEventHandler;
  onChangeFormValues: Dispatch<SetStateAction<JRoom>>;
  formValues: JRoom;
  isError: boolean;
}) => {
  return (
    <div className="home-container">
      <div className="card enter-form p-4 p-sm-5">
        <h1 className="text-center mb-4">Entre em uma sala</h1>
        <form onSubmit={onJoinRoom}>
          <div className="mb-3">
            <input
              className="form-control"
              type="text"
              name="username"
              value={formValues?.username}
              onChange={(e) =>
                onChangeFormValues({ ...formValues, username: e.target.value })
              }
              placeholder="Nome de usuário"
              required
            />
          </div>
          <div className="mb-3">
            <select
              className="form-select"
              name="roomname"
              id="room"
              onChange={(e) =>
                onChangeFormValues({ ...formValues, roomname: e.target.value })
              }
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
            </select>
          </div>
          <button className="btn btn-primary" type="submit">
            Entrar
          </button>
          {isError && (
            <p className="mt-4 alert alert-danger">
              Não foi possível realizar a conxão com o chat
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default JoinRoom;
