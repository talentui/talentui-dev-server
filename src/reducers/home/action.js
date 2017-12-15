import { fromJS } from "immutable";

import {
    constProduct,
    constSpecial,
    constTarget,
    constTalentUI,
    constPass,
    GET_CONFIG_FROM_SERVER,
    SAVE_CONFIG_SUCCESS,
    CLEAR_SAVING_STATUS
} from "./const";
import { v1 } from "uuid";

export function getData() {
    return function(dispatch) {
        fetch("/api/get")
            .then(function(res) {
                return res.json();
            })
            .then(function(config) {
                dispatch({
                    type: GET_CONFIG_FROM_SERVER,
                    home: fromJS(config)
                });
            });
    };
}

export function clearSaveStatus() {
    return { type: CLEAR_SAVING_STATUS };
}

export function saveData() {
    return function(dispatch, getState) {
        let data = getState()
            .get("home")
            .toJS();
        fetch("/api/save", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data)
        })
            .then(res => {
                return res.json();
            })
            .then(res => {
                let { status } = res;
                dispatch({
                    type: SAVE_CONFIG_SUCCESS,
                    status
                });
            });
    };
}

export const homeSpecialActions = {
    addSpecial() {
        return {
            type: constSpecial.ADD_A_SPECIAL,
            config: {
                port: "",
                name: "",
                id: v1(),
                reg: "",
                referer: ""
            }
        };
    },
    changeSpecialName(name, specialId) {
        return { type: constSpecial.CHANGE_SPECIAL_NAME, name, specialId };
    },
    changeSpecialReg(reg, specialId) {
        return { type: constSpecial.CHANGE_SPECIAL_REG, reg, specialId };
    },
    changeSpecialPort(port, specialId) {
        return { type: constSpecial.CHANGE_SPECIAL_PORT, port, specialId };
    },
    changeSpecialReferer(referer, specialId) {
        return {
            type: constSpecial.CHANAGE_SPECIAL_REFERER,
            referer,
            specialId
        };
    },
    deleteSpecialConfig(specialId) {
        return { type: constSpecial.DELETE_A_SPECIAL, specialId };
    },
    toggleEnabled(specialId) {
        return {
            type: constSpecial.TOGGLE_SPECIAL_ENABLED,
            specialId
        };
    }
};

// 未匹配到请求要发送的地址
export const homeTargetActions = {
    changeTargetName: function(name) {
        return {
            type: constTarget.CHANGE_TARGET_NAME,
            name
        };
    },
    changeTargetIP: function(ip) {
        return {
            type: constTarget.CHANAGE_TARGET_IP,
            ip
        };
    }
};

export const homeTalentuiActions = {
    addProject: function() {
        return {
            type: constTalentUI.ADD_TALENTUI_PROJECT,
            project: {
                name: "",
                port: "",
                id: v1()
            }
        };
    },
    changeProjectName: function(name, projectId) {
        return {
            type: constTalentUI.CHANAGE_TALENTUI_PROJECT_NAME,
            name,
            projectId
        };
    },
    changeProjectPort: function(port, projectId) {
        return {
            type: constTalentUI.CHANAGE_TALENTUI_PROJECT_PORT,
            port,
            projectId
        };
    },
    changeTemplate: function(template) {
        return {
            type: constTalentUI.CHANAGE_TALENTUI_TEMPLATE,
            template
        };
    },
    toggleEnabled: function(projectId) {
        return { type: constTalentUI.TOGGLE_TALENTUI_ENABLED, projectId };
    },
    deleteTalentuiProject: function(projectId) {
        return { type: constTalentUI.DELETE_TALENTUI_PROJECT, projectId };
    }
};
