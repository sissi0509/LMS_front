"use client";
import { FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import * as client from "../../client";
import { setModules, editModule, updateModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import type { Module } from "./type";

export default function Modules() {
  const { cid } = useParams<{ cid: string }>();
  const [moduleName, setModuleName] = useState("");
  const modules = useSelector<RootState, Module[]>(
    (state: RootState) => state.modulesReducer.modules
  );

  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  const isFaculty = currentUser?.role === "FACULTY";

  const dispatch = useDispatch();
  const onCreateModuleForCourse = async () => {
    if (!cid) return;
    const newModule = { name: moduleName, course: cid };
    const newCreatedModule = await client.createModuleForCourse(cid, newModule);
    dispatch(setModules([...modules, newCreatedModule]));
  };
  const onRemoveModule = async (moduleId: string) => {
    await client.deleteModule(cid, moduleId);
    dispatch(setModules(modules.filter((m: any) => m._id !== moduleId)));
  };
  const onUpdateModule = async (module: any) => {
    await client.updateModule(cid, module);
    const newModules = modules.map((m: any) =>
      m._id === module._id ? module : m
    );

    dispatch(setModules(newModules));
  };

  const fetchModules = async () => {
    const modules = await client.findModulesForCourse(cid as string);
    dispatch(setModules(modules));
  };
  useEffect(() => {
    fetchModules();
  }, []);

  return (
    <div>
      <div className="mb-5">
        <ModulesControls
          setModuleName={setModuleName}
          moduleName={moduleName}
          addModule={onCreateModuleForCourse}
        />
      </div>

      <ListGroup className="rounded-0" id="wd-modules">
        {modules.map((m, i) => (
          <ListGroupItem
            key={i}
            className="wd-module p-0 mb-5 fs-5 border-gray "
          >
            <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between ">
              <div>
                <BsGripVertical className="me-2" />
                {!m.editing && m.name}
                {m.editing && isFaculty && (
                  <FormControl
                    className="w-75 d-inline-block"
                    onChange={(e) =>
                      dispatch(updateModule({ ...m, name: e.target.value }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        onUpdateModule({ ...m, editing: false });
                      }
                    }}
                    defaultValue={m.name}
                  />
                )}
              </div>
              {isFaculty && (
                <ModuleControlButtons
                  moduleId={m._id}
                  deleteModule={(moduleId) => onRemoveModule(moduleId)}
                  editModule={(moduleId) => dispatch(editModule(moduleId))}
                />
              )}
            </div>
            {m.lessons && (
              <ListGroup className="wd-lessons rounded-0">
                {m.lessons.map((lesson, j) => (
                  <ListGroupItem
                    key={j}
                    className="wd-lesson p-3 ps-1 d-flex justify-content-between"
                  >
                    <div>
                      <BsGripVertical className="me-2" />
                      {lesson.name}
                    </div>
                    <LessonControlButtons />
                  </ListGroupItem>
                ))}
              </ListGroup>
            )}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
