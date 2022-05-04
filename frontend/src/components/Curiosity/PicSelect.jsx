import { React } from "react";

export default function PicSelect({ picList, cameraList }) {
  return (
    <option value={cameraList}>
      {cameraList.camera.full_name} - {cameraList.camera.name} -{" "}
      {
        picList.filter((pic) =>
          pic.camera.name.includes(cameraList.camera.name)
        ).length
      }{" "}
      photos
    </option>
  );
}
