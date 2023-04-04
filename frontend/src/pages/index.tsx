import { FormEvent, useState } from "react";

import { EnterRoom } from "@/types";
import { useRouter } from "next/router";

const initialFormValues: EnterRoom = {
  username: "",
  roomname: "javascript",
};

const Home = () => {
  const [formValues, setFormValues] = useState<EnterRoom>(initialFormValues);
  const router = useRouter();

  const handleEnterRoom = (e: FormEvent) => {
    e.preventDefault();

    if (!formValues.username || !formValues.roomname) {
      return;
    }

    console.log(formValues);
    router.push("/chat");
  };

  return (
    <div className="home-container">
      <div className="card enter-form p-4 p-sm-5">
        <h1 className="text-center mb-4">Entre em uma sala</h1>
        <form onSubmit={handleEnterRoom}>
          <div className="mb-3">
            <input
              className="form-control"
              type="text"
              name="name"
              value={formValues?.username}
              onChange={(e) =>
                setFormValues({ ...formValues, username: e.target.value })
              }
              placeholder="Nome de usuário"
              required
            />
          </div>
          <div className="mb-3">
            <select
              className="form-select"
              name="room"
              id="room"
              onChange={(e) =>
                setFormValues({ ...formValues, roomname: e.target.value })
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
        </form>
      </div>
    </div>
  );
};

export default Home;
