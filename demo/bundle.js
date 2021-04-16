/******/ (function (modules) {
  // webpackBootstrap
  /******/ function hotDisposeChunk(chunkId) {
    /******/ delete installedChunks[chunkId];
    /******/
  }
  /******/ var parentHotUpdateCallback = window["webpackHotUpdate"];
  /******/ window[
    "webpackHotUpdate"
  ] = /******/ function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-next-line no-unused-vars
    /******/ hotAddUpdateChunk(chunkId, moreModules);
    /******/ if (parentHotUpdateCallback)
      parentHotUpdateCallback(chunkId, moreModules);
    /******/
  }; // eslint-disable-next-line no-unused-vars
  /******/
  /******/ /******/ function hotDownloadUpdateChunk(chunkId) {
    /******/ var script = document.createElement("script");
    /******/ script.charset = "utf-8";
    /******/ script.src =
      __webpack_require__.p +
      "" +
      chunkId +
      "." +
      hotCurrentHash +
      ".hot-update.js";
    /******/ if (null) script.crossOrigin = null;
    /******/ document.head.appendChild(script);
    /******/
  } // eslint-disable-next-line no-unused-vars
  /******/
  /******/ /******/ function hotDownloadManifest(requestTimeout) {
    /******/ requestTimeout = requestTimeout || 10000;
    /******/ return new Promise(function (resolve, reject) {
      /******/ if (typeof XMLHttpRequest === "undefined") {
        /******/ return reject(new Error("No browser support"));
        /******/
      }
      /******/ try {
        /******/ var request = new XMLHttpRequest();
        /******/ var requestPath =
          __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
        /******/ request.open("GET", requestPath, true);
        /******/ request.timeout = requestTimeout;
        /******/ request.send(null);
        /******/
      } catch (err) {
        /******/ return reject(err);
        /******/
      }
      /******/ request.onreadystatechange = function () {
        /******/ if (request.readyState !== 4) return;
        /******/ if (request.status === 0) {
          /******/ // timeout
          /******/ reject(
            /******/ new Error(
              "Manifest request to " + requestPath + " timed out."
            )
            /******/
          );
          /******/
        } else if (request.status === 404) {
          /******/ // no update available
          /******/ resolve();
          /******/
        } else if (request.status !== 200 && request.status !== 304) {
          /******/ // other failure
          /******/ reject(
            new Error("Manifest request to " + requestPath + " failed.")
          );
          /******/
        } else {
          /******/ // success
          /******/ try {
            /******/ var update = JSON.parse(request.responseText);
            /******/
          } catch (e) {
            /******/ reject(e);
            /******/ return;
            /******/
          }
          /******/ resolve(update);
          /******/
        }
        /******/
      };
      /******/
    });
    /******/
  }
  /******/
  /******/ var hotApplyOnUpdate = true; // eslint-disable-next-line no-unused-vars
  /******/ /******/ var hotCurrentHash = "61092caf9e8d253fa372";
  /******/ var hotRequestTimeout = 10000;
  /******/ var hotCurrentModuleData = {};
  /******/ var hotCurrentChildModule; // eslint-disable-next-line no-unused-vars
  /******/ /******/ var hotCurrentParents = []; // eslint-disable-next-line no-unused-vars
  /******/ /******/ var hotCurrentParentsTemp = []; // eslint-disable-next-line no-unused-vars
  /******/
  /******/ /******/ function hotCreateRequire(moduleId) {
    /******/ var me = installedModules[moduleId];
    /******/ if (!me) return __webpack_require__;
    /******/ var fn = function (request) {
      /******/ if (me.hot.active) {
        /******/ if (installedModules[request]) {
          /******/ if (
            installedModules[request].parents.indexOf(moduleId) === -1
          ) {
            /******/ installedModules[request].parents.push(moduleId);
            /******/
          }
          /******/
        } else {
          /******/ hotCurrentParents = [moduleId];
          /******/ hotCurrentChildModule = request;
          /******/
        }
        /******/ if (me.children.indexOf(request) === -1) {
          /******/ me.children.push(request);
          /******/
        }
        /******/
      } else {
        /******/ console.warn(
          /******/ "[HMR] unexpected require(" +
            /******/ request +
            /******/ ") from disposed module " +
            /******/ moduleId
          /******/
        );
        /******/ hotCurrentParents = [];
        /******/
      }
      /******/ return __webpack_require__(request);
      /******/
    };
    /******/ var ObjectFactory = function ObjectFactory(name) {
      /******/ return {
        /******/ configurable: true,
        /******/ enumerable: true,
        /******/ get: function () {
          /******/ return __webpack_require__[name];
          /******/
        },
        /******/ set: function (value) {
          /******/ __webpack_require__[name] = value;
          /******/
        },
        /******/
      };
      /******/
    };
    /******/ for (var name in __webpack_require__) {
      /******/ if (
        /******/ Object.prototype.hasOwnProperty.call(
          __webpack_require__,
          name
        ) &&
        /******/ name !== "e" &&
        /******/ name !== "t"
        /******/
      ) {
        /******/ Object.defineProperty(fn, name, ObjectFactory(name));
        /******/
      }
      /******/
    }
    /******/ fn.e = function (chunkId) {
      /******/ if (hotStatus === "ready") hotSetStatus("prepare");
      /******/ hotChunksLoading++;
      /******/ return __webpack_require__
        .e(chunkId)
        .then(finishChunkLoading, function (err) {
          /******/ finishChunkLoading();
          /******/ throw err;
          /******/
        });
      /******/
      /******/ function finishChunkLoading() {
        /******/ hotChunksLoading--;
        /******/ if (hotStatus === "prepare") {
          /******/ if (!hotWaitingFilesMap[chunkId]) {
            /******/ hotEnsureUpdateChunk(chunkId);
            /******/
          }
          /******/ if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
            /******/ hotUpdateDownloaded();
            /******/
          }
          /******/
        }
        /******/
      }
      /******/
    };
    /******/ fn.t = function (value, mode) {
      /******/ if (mode & 1) value = fn(value);
      /******/ return __webpack_require__.t(value, mode & ~1);
      /******/
    };
    /******/ return fn;
    /******/
  } // eslint-disable-next-line no-unused-vars
  /******/
  /******/ /******/ function hotCreateModule(moduleId) {
    /******/ var hot = {
      /******/ // private stuff
      /******/ _acceptedDependencies: {},
      /******/ _declinedDependencies: {},
      /******/ _selfAccepted: false,
      /******/ _selfDeclined: false,
      /******/ _selfInvalidated: false,
      /******/ _disposeHandlers: [],
      /******/ _main: hotCurrentChildModule !== moduleId, // Module API
      /******/
      /******/ /******/ active: true,
      /******/ accept: function (dep, callback) {
        /******/ if (dep === undefined) hot._selfAccepted = true;
        /******/ else if (typeof dep === "function") hot._selfAccepted = dep;
        /******/ else if (typeof dep === "object")
          /******/ for (var i = 0; i < dep.length; i++)
            /******/ hot._acceptedDependencies[dep[i]] =
              callback || function () {};
        /******/ else
          hot._acceptedDependencies[dep] = callback || function () {};
        /******/
      },
      /******/ decline: function (dep) {
        /******/ if (dep === undefined) hot._selfDeclined = true;
        /******/ else if (typeof dep === "object")
          /******/ for (var i = 0; i < dep.length; i++)
            /******/ hot._declinedDependencies[dep[i]] = true;
        /******/ else hot._declinedDependencies[dep] = true;
        /******/
      },
      /******/ dispose: function (callback) {
        /******/ hot._disposeHandlers.push(callback);
        /******/
      },
      /******/ addDisposeHandler: function (callback) {
        /******/ hot._disposeHandlers.push(callback);
        /******/
      },
      /******/ removeDisposeHandler: function (callback) {
        /******/ var idx = hot._disposeHandlers.indexOf(callback);
        /******/ if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
        /******/
      },
      /******/ invalidate: function () {
        /******/ this._selfInvalidated = true;
        /******/ switch (hotStatus) {
          /******/ case "idle":
            /******/ hotUpdate = {};
            /******/ hotUpdate[moduleId] = modules[moduleId];
            /******/ hotSetStatus("ready");
            /******/ break;
          /******/ case "ready":
            /******/ hotApplyInvalidatedModule(moduleId);
            /******/ break;
          /******/ case "prepare":
          /******/ case "check":
          /******/ case "dispose":
          /******/ case "apply":
            /******/ (hotQueuedInvalidatedModules =
              /******/ hotQueuedInvalidatedModules || []).push(moduleId);
            /******/ break;
          /******/ default:
            /******/ // ignore requests in error states
            /******/ break;
          /******/
        }
        /******/
      }, // Management API
      /******/
      /******/ /******/ check: hotCheck,
      /******/ apply: hotApply,
      /******/ status: function (l) {
        /******/ if (!l) return hotStatus;
        /******/ hotStatusHandlers.push(l);
        /******/
      },
      /******/ addStatusHandler: function (l) {
        /******/ hotStatusHandlers.push(l);
        /******/
      },
      /******/ removeStatusHandler: function (l) {
        /******/ var idx = hotStatusHandlers.indexOf(l);
        /******/ if (idx >= 0) hotStatusHandlers.splice(idx, 1);
        /******/
      }, //inherit from previous dispose call
      /******/
      /******/ /******/ data: hotCurrentModuleData[moduleId],
      /******/
    };
    /******/ hotCurrentChildModule = undefined;
    /******/ return hot;
    /******/
  }
  /******/
  /******/ var hotStatusHandlers = [];
  /******/ var hotStatus = "idle";
  /******/
  /******/ function hotSetStatus(newStatus) {
    /******/ hotStatus = newStatus;
    /******/ for (var i = 0; i < hotStatusHandlers.length; i++)
      /******/ hotStatusHandlers[i].call(null, newStatus);
    /******/
  } // while downloading
  /******/
  /******/ /******/ var hotWaitingFiles = 0;
  /******/ var hotChunksLoading = 0;
  /******/ var hotWaitingFilesMap = {};
  /******/ var hotRequestedFilesMap = {};
  /******/ var hotAvailableFilesMap = {};
  /******/ var hotDeferred; // The update info
  /******/
  /******/ /******/ var hotUpdate,
    hotUpdateNewHash,
    hotQueuedInvalidatedModules;
  /******/
  /******/ function toModuleId(id) {
    /******/ var isNumber = +id + "" === id;
    /******/ return isNumber ? +id : id;
    /******/
  }
  /******/
  /******/ function hotCheck(apply) {
    /******/ if (hotStatus !== "idle") {
      /******/ throw new Error("check() is only allowed in idle status");
      /******/
    }
    /******/ hotApplyOnUpdate = apply;
    /******/ hotSetStatus("check");
    /******/ return hotDownloadManifest(hotRequestTimeout).then(function (
      update
    ) {
      /******/ if (!update) {
        /******/ hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
        /******/ return null;
        /******/
      }
      /******/ hotRequestedFilesMap = {};
      /******/ hotWaitingFilesMap = {};
      /******/ hotAvailableFilesMap = update.c;
      /******/ hotUpdateNewHash = update.h;
      /******/
      /******/ hotSetStatus("prepare");
      /******/ var promise = new Promise(function (resolve, reject) {
        /******/ hotDeferred = {
          /******/ resolve: resolve,
          /******/ reject: reject,
          /******/
        };
        /******/
      });
      /******/ hotUpdate = {};
      /******/ var chunkId = 0; // eslint-disable-next-line no-lone-blocks
      /******/ /******/ {
        /******/ hotEnsureUpdateChunk(chunkId);
        /******/
      }
      /******/ if (
        /******/ hotStatus === "prepare" &&
        /******/ hotChunksLoading === 0 &&
        /******/ hotWaitingFiles === 0
        /******/
      ) {
        /******/ hotUpdateDownloaded();
        /******/
      }
      /******/ return promise;
      /******/
    });
    /******/
  } // eslint-disable-next-line no-unused-vars
  /******/
  /******/ /******/ function hotAddUpdateChunk(chunkId, moreModules) {
    /******/ if (
      !hotAvailableFilesMap[chunkId] ||
      !hotRequestedFilesMap[chunkId]
    )
      /******/ return;
    /******/ hotRequestedFilesMap[chunkId] = false;
    /******/ for (var moduleId in moreModules) {
      /******/ if (
        Object.prototype.hasOwnProperty.call(moreModules, moduleId)
      ) {
        /******/ hotUpdate[moduleId] = moreModules[moduleId];
        /******/
      }
      /******/
    }
    /******/ if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
      /******/ hotUpdateDownloaded();
      /******/
    }
    /******/
  }
  /******/
  /******/ function hotEnsureUpdateChunk(chunkId) {
    /******/ if (!hotAvailableFilesMap[chunkId]) {
      /******/ hotWaitingFilesMap[chunkId] = true;
      /******/
    } else {
      /******/ hotRequestedFilesMap[chunkId] = true;
      /******/ hotWaitingFiles++;
      /******/ hotDownloadUpdateChunk(chunkId);
      /******/
    }
    /******/
  }
  /******/
  /******/ function hotUpdateDownloaded() {
    /******/ hotSetStatus("ready");
    /******/ var deferred = hotDeferred;
    /******/ hotDeferred = null;
    /******/ if (!deferred) return;
    /******/ if (hotApplyOnUpdate) {
      /******/ // Wrap deferred object in Promise to mark it as a well-handled Promise to
      /******/ // avoid triggering uncaught exception warning in Chrome.
      /******/ // See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
      /******/ Promise.resolve()
        /******/ .then(function () {
          /******/ return hotApply(hotApplyOnUpdate);
          /******/
        })
        /******/ .then(
          /******/ function (result) {
            /******/ deferred.resolve(result);
            /******/
          },
          /******/ function (err) {
            /******/ deferred.reject(err);
            /******/
          }
          /******/
        );
      /******/
    } else {
      /******/ var outdatedModules = [];
      /******/ for (var id in hotUpdate) {
        /******/ if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
          /******/ outdatedModules.push(toModuleId(id));
          /******/
        }
        /******/
      }
      /******/ deferred.resolve(outdatedModules);
      /******/
    }
    /******/
  }
  /******/
  /******/ function hotApply(options) {
    /******/ if (hotStatus !== "ready")
      /******/ throw new Error("apply() is only allowed in ready status");
    /******/ options = options || {};
    /******/ return hotApplyInternal(options);
    /******/
  }
  /******/
  /******/ function hotApplyInternal(options) {
    /******/ hotApplyInvalidatedModules();
    /******/
    /******/ var cb;
    /******/ var i;
    /******/ var j;
    /******/ var module;
    /******/ var moduleId;
    /******/
    /******/ function getAffectedStuff(updateModuleId) {
      /******/ var outdatedModules = [updateModuleId];
      /******/ var outdatedDependencies = {};
      /******/
      /******/ var queue = outdatedModules.map(function (id) {
        /******/ return {
          /******/ chain: [id],
          /******/ id: id,
          /******/
        };
        /******/
      });
      /******/ while (queue.length > 0) {
        /******/ var queueItem = queue.pop();
        /******/ var moduleId = queueItem.id;
        /******/ var chain = queueItem.chain;
        /******/ module = installedModules[moduleId];
        /******/ if (
          /******/ !module ||
          /******/ (module.hot._selfAccepted && !module.hot._selfInvalidated)
          /******/
        )
          /******/ continue;
        /******/ if (module.hot._selfDeclined) {
          /******/ return {
            /******/ type: "self-declined",
            /******/ chain: chain,
            /******/ moduleId: moduleId,
            /******/
          };
          /******/
        }
        /******/ if (module.hot._main) {
          /******/ return {
            /******/ type: "unaccepted",
            /******/ chain: chain,
            /******/ moduleId: moduleId,
            /******/
          };
          /******/
        }
        /******/ for (var i = 0; i < module.parents.length; i++) {
          /******/ var parentId = module.parents[i];
          /******/ var parent = installedModules[parentId];
          /******/ if (!parent) continue;
          /******/ if (parent.hot._declinedDependencies[moduleId]) {
            /******/ return {
              /******/ type: "declined",
              /******/ chain: chain.concat([parentId]),
              /******/ moduleId: moduleId,
              /******/ parentId: parentId,
              /******/
            };
            /******/
          }
          /******/ if (outdatedModules.indexOf(parentId) !== -1) continue;
          /******/ if (parent.hot._acceptedDependencies[moduleId]) {
            /******/ if (!outdatedDependencies[parentId])
              /******/ outdatedDependencies[parentId] = [];
            /******/ addAllToSet(outdatedDependencies[parentId], [moduleId]);
            /******/ continue;
            /******/
          }
          /******/ delete outdatedDependencies[parentId];
          /******/ outdatedModules.push(parentId);
          /******/ queue.push({
            /******/ chain: chain.concat([parentId]),
            /******/ id: parentId,
            /******/
          });
          /******/
        }
        /******/
      }
      /******/
      /******/ return {
        /******/ type: "accepted",
        /******/ moduleId: updateModuleId,
        /******/ outdatedModules: outdatedModules,
        /******/ outdatedDependencies: outdatedDependencies,
        /******/
      };
      /******/
    }
    /******/
    /******/ function addAllToSet(a, b) {
      /******/ for (var i = 0; i < b.length; i++) {
        /******/ var item = b[i];
        /******/ if (a.indexOf(item) === -1) a.push(item);
        /******/
      }
      /******/
    } // at begin all updates modules are outdated // the "outdated" status can propagate to parents if they don't accept the children
    /******/
    /******/ /******/ /******/ var outdatedDependencies = {};
    /******/ var outdatedModules = [];
    /******/ var appliedUpdate = {};
    /******/
    /******/ var warnUnexpectedRequire = function warnUnexpectedRequire() {
      /******/ console.warn(
        /******/ "[HMR] unexpected require(" +
          result.moduleId +
          ") to disposed module"
        /******/
      );
      /******/
    };
    /******/
    /******/ for (var id in hotUpdate) {
      /******/ if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
        /******/ moduleId = toModuleId(id);
        /******/ /** @type {TODO} */
        /******/ var result;
        /******/ if (hotUpdate[id]) {
          /******/ result = getAffectedStuff(moduleId);
          /******/
        } else {
          /******/ result = {
            /******/ type: "disposed",
            /******/ moduleId: id,
            /******/
          };
          /******/
        }
        /******/ /** @type {Error|false} */
        /******/ var abortError = false;
        /******/ var doApply = false;
        /******/ var doDispose = false;
        /******/ var chainInfo = "";
        /******/ if (result.chain) {
          /******/ chainInfo =
            "\nUpdate propagation: " + result.chain.join(" -> ");
          /******/
        }
        /******/ switch (result.type) {
          /******/ case "self-declined":
            /******/ if (options.onDeclined) options.onDeclined(result);
            /******/ if (!options.ignoreDeclined)
              /******/ abortError = new Error(
                /******/ "Aborted because of self decline: " +
                  /******/ result.moduleId +
                  /******/ chainInfo
                /******/
              );
            /******/ break;
          /******/ case "declined":
            /******/ if (options.onDeclined) options.onDeclined(result);
            /******/ if (!options.ignoreDeclined)
              /******/ abortError = new Error(
                /******/ "Aborted because of declined dependency: " +
                  /******/ result.moduleId +
                  /******/ " in " +
                  /******/ result.parentId +
                  /******/ chainInfo
                /******/
              );
            /******/ break;
          /******/ case "unaccepted":
            /******/ if (options.onUnaccepted) options.onUnaccepted(result);
            /******/ if (!options.ignoreUnaccepted)
              /******/ abortError = new Error(
                /******/ "Aborted because " +
                  moduleId +
                  " is not accepted" +
                  chainInfo
                /******/
              );
            /******/ break;
          /******/ case "accepted":
            /******/ if (options.onAccepted) options.onAccepted(result);
            /******/ doApply = true;
            /******/ break;
          /******/ case "disposed":
            /******/ if (options.onDisposed) options.onDisposed(result);
            /******/ doDispose = true;
            /******/ break;
          /******/ default:
            /******/ throw new Error("Unexception type " + result.type);
          /******/
        }
        /******/ if (abortError) {
          /******/ hotSetStatus("abort");
          /******/ return Promise.reject(abortError);
          /******/
        }
        /******/ if (doApply) {
          /******/ appliedUpdate[moduleId] = hotUpdate[moduleId];
          /******/ addAllToSet(outdatedModules, result.outdatedModules);
          /******/ for (moduleId in result.outdatedDependencies) {
            /******/ if (
              /******/ Object.prototype.hasOwnProperty.call(
                /******/ result.outdatedDependencies,
                /******/ moduleId
                /******/
              )
              /******/
            ) {
              /******/ if (!outdatedDependencies[moduleId])
                /******/ outdatedDependencies[moduleId] = [];
              /******/ addAllToSet(
                /******/ outdatedDependencies[moduleId],
                /******/ result.outdatedDependencies[moduleId]
                /******/
              );
              /******/
            }
            /******/
          }
          /******/
        }
        /******/ if (doDispose) {
          /******/ addAllToSet(outdatedModules, [result.moduleId]);
          /******/ appliedUpdate[moduleId] = warnUnexpectedRequire;
          /******/
        }
        /******/
      }
      /******/
    } // Store self accepted outdated modules to require them later by the module system
    /******/
    /******/ /******/ var outdatedSelfAcceptedModules = [];
    /******/ for (i = 0; i < outdatedModules.length; i++) {
      /******/ moduleId = outdatedModules[i];
      /******/ if (
        /******/ installedModules[moduleId] &&
        /******/ installedModules[moduleId].hot._selfAccepted && // removed self-accepted modules should not be required
        /******/ /******/ appliedUpdate[moduleId] !== warnUnexpectedRequire && // when called invalidate self-accepting is not possible
        /******/ /******/ !installedModules[moduleId].hot._selfInvalidated
        /******/
      ) {
        /******/ outdatedSelfAcceptedModules.push({
          /******/ module: moduleId,
          /******/ parents: installedModules[moduleId].parents.slice(),
          /******/ errorHandler: installedModules[moduleId].hot._selfAccepted,
          /******/
        });
        /******/
      }
      /******/
    } // Now in "dispose" phase
    /******/
    /******/ /******/ hotSetStatus("dispose");
    /******/ Object.keys(hotAvailableFilesMap).forEach(function (chunkId) {
      /******/ if (hotAvailableFilesMap[chunkId] === false) {
        /******/ hotDisposeChunk(chunkId);
        /******/
      }
      /******/
    });
    /******/
    /******/ var idx;
    /******/ var queue = outdatedModules.slice();
    /******/ while (queue.length > 0) {
      /******/ moduleId = queue.pop();
      /******/ module = installedModules[moduleId];
      /******/ if (!module) continue;
      /******/
      /******/ var data = {}; // Call dispose handlers
      /******/
      /******/ /******/ var disposeHandlers = module.hot._disposeHandlers;
      /******/ for (j = 0; j < disposeHandlers.length; j++) {
        /******/ cb = disposeHandlers[j];
        /******/ cb(data);
        /******/
      }
      /******/ hotCurrentModuleData[moduleId] = data; // disable module (this disables requires from this module)
      /******/
      /******/ /******/ module.hot.active = false; // remove module from cache
      /******/
      /******/ /******/ delete installedModules[moduleId]; // when disposing there is no need to call dispose handler
      /******/
      /******/ /******/ delete outdatedDependencies[moduleId]; // remove "parents" references from all children
      /******/
      /******/ /******/ for (j = 0; j < module.children.length; j++) {
        /******/ var child = installedModules[module.children[j]];
        /******/ if (!child) continue;
        /******/ idx = child.parents.indexOf(moduleId);
        /******/ if (idx >= 0) {
          /******/ child.parents.splice(idx, 1);
          /******/
        }
        /******/
      }
      /******/
    } // remove outdated dependency from module children
    /******/
    /******/ /******/ var dependency;
    /******/ var moduleOutdatedDependencies;
    /******/ for (moduleId in outdatedDependencies) {
      /******/ if (
        /******/ Object.prototype.hasOwnProperty.call(
          outdatedDependencies,
          moduleId
        )
        /******/
      ) {
        /******/ module = installedModules[moduleId];
        /******/ if (module) {
          /******/ moduleOutdatedDependencies = outdatedDependencies[moduleId];
          /******/ for (j = 0; j < moduleOutdatedDependencies.length; j++) {
            /******/ dependency = moduleOutdatedDependencies[j];
            /******/ idx = module.children.indexOf(dependency);
            /******/ if (idx >= 0) module.children.splice(idx, 1);
            /******/
          }
          /******/
        }
        /******/
      }
      /******/
    } // Now in "apply" phase
    /******/
    /******/ /******/ hotSetStatus("apply");
    /******/
    /******/ if (hotUpdateNewHash !== undefined) {
      /******/ hotCurrentHash = hotUpdateNewHash;
      /******/ hotUpdateNewHash = undefined;
      /******/
    }
    /******/ hotUpdate = undefined; // insert new code
    /******/
    /******/ /******/ for (moduleId in appliedUpdate) {
      /******/ if (
        Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)
      ) {
        /******/ modules[moduleId] = appliedUpdate[moduleId];
        /******/
      }
      /******/
    } // call accept handlers
    /******/
    /******/ /******/ var error = null;
    /******/ for (moduleId in outdatedDependencies) {
      /******/ if (
        /******/ Object.prototype.hasOwnProperty.call(
          outdatedDependencies,
          moduleId
        )
        /******/
      ) {
        /******/ module = installedModules[moduleId];
        /******/ if (module) {
          /******/ moduleOutdatedDependencies = outdatedDependencies[moduleId];
          /******/ var callbacks = [];
          /******/ for (i = 0; i < moduleOutdatedDependencies.length; i++) {
            /******/ dependency = moduleOutdatedDependencies[i];
            /******/ cb = module.hot._acceptedDependencies[dependency];
            /******/ if (cb) {
              /******/ if (callbacks.indexOf(cb) !== -1) continue;
              /******/ callbacks.push(cb);
              /******/
            }
            /******/
          }
          /******/ for (i = 0; i < callbacks.length; i++) {
            /******/ cb = callbacks[i];
            /******/ try {
              /******/ cb(moduleOutdatedDependencies);
              /******/
            } catch (err) {
              /******/ if (options.onErrored) {
                /******/ options.onErrored({
                  /******/ type: "accept-errored",
                  /******/ moduleId: moduleId,
                  /******/ dependencyId: moduleOutdatedDependencies[i],
                  /******/ error: err,
                  /******/
                });
                /******/
              }
              /******/ if (!options.ignoreErrored) {
                /******/ if (!error) error = err;
                /******/
              }
              /******/
            }
            /******/
          }
          /******/
        }
        /******/
      }
      /******/
    } // Load self accepted modules
    /******/
    /******/ /******/ for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
      /******/ var item = outdatedSelfAcceptedModules[i];
      /******/ moduleId = item.module;
      /******/ hotCurrentParents = item.parents;
      /******/ hotCurrentChildModule = moduleId;
      /******/ try {
        /******/ __webpack_require__(moduleId);
        /******/
      } catch (err) {
        /******/ if (typeof item.errorHandler === "function") {
          /******/ try {
            /******/ item.errorHandler(err);
            /******/
          } catch (err2) {
            /******/ if (options.onErrored) {
              /******/ options.onErrored({
                /******/ type: "self-accept-error-handler-errored",
                /******/ moduleId: moduleId,
                /******/ error: err2,
                /******/ originalError: err,
                /******/
              });
              /******/
            }
            /******/ if (!options.ignoreErrored) {
              /******/ if (!error) error = err2;
              /******/
            }
            /******/ if (!error) error = err;
            /******/
          }
          /******/
        } else {
          /******/ if (options.onErrored) {
            /******/ options.onErrored({
              /******/ type: "self-accept-errored",
              /******/ moduleId: moduleId,
              /******/ error: err,
              /******/
            });
            /******/
          }
          /******/ if (!options.ignoreErrored) {
            /******/ if (!error) error = err;
            /******/
          }
          /******/
        }
        /******/
      }
      /******/
    } // handle errors in accept handlers and self accepted module load
    /******/
    /******/ /******/ if (error) {
      /******/ hotSetStatus("fail");
      /******/ return Promise.reject(error);
      /******/
    }
    /******/
    /******/ if (hotQueuedInvalidatedModules) {
      /******/ return hotApplyInternal(options).then(function (list) {
        /******/ outdatedModules.forEach(function (moduleId) {
          /******/ if (list.indexOf(moduleId) < 0) list.push(moduleId);
          /******/
        });
        /******/ return list;
        /******/
      });
      /******/
    }
    /******/
    /******/ hotSetStatus("idle");
    /******/ return new Promise(function (resolve) {
      /******/ resolve(outdatedModules);
      /******/
    });
    /******/
  }
  /******/
  /******/ function hotApplyInvalidatedModules() {
    /******/ if (hotQueuedInvalidatedModules) {
      /******/ if (!hotUpdate) hotUpdate = {};
      /******/ hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
      /******/ hotQueuedInvalidatedModules = undefined;
      /******/ return true;
      /******/
    }
    /******/
  }
  /******/
  /******/ function hotApplyInvalidatedModule(moduleId) {
    /******/ if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
      /******/ hotUpdate[moduleId] = modules[moduleId];
    /******/
  } // The module cache
  /******/
  /******/ /******/ var installedModules = {}; // The require function
  /******/
  /******/ /******/ function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/ if (installedModules[moduleId]) {
      /******/ return installedModules[moduleId].exports;
      /******/
    } // Create a new module (and put it into the cache)
    /******/ /******/ var module = (installedModules[moduleId] = {
      /******/ i: moduleId,
      /******/ l: false,
      /******/ exports: {},
      /******/ hot: hotCreateModule(moduleId),
      /******/ parents:
        ((hotCurrentParentsTemp = hotCurrentParents),
        (hotCurrentParents = []),
        hotCurrentParentsTemp),
      /******/ children: [],
      /******/
    }); // Execute the module function
    /******/
    /******/ /******/ modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      hotCreateRequire(moduleId)
    ); // Flag the module as loaded
    /******/
    /******/ /******/ module.l = true; // Return the exports of the module
    /******/
    /******/ /******/ return module.exports;
    /******/
  } // expose the modules object (__webpack_modules__)
  /******/
  /******/
  /******/ /******/ __webpack_require__.m = modules; // expose the module cache
  /******/
  /******/ /******/ __webpack_require__.c = installedModules; // define getter function for harmony exports
  /******/
  /******/ /******/ __webpack_require__.d = function (exports, name, getter) {
    /******/ if (!__webpack_require__.o(exports, name)) {
      /******/ Object.defineProperty(exports, name, {
        enumerable: true,
        get: getter,
      });
      /******/
    }
    /******/
  }; // define __esModule on exports
  /******/
  /******/ /******/ __webpack_require__.r = function (exports) {
    /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
      /******/ Object.defineProperty(exports, Symbol.toStringTag, {
        value: "Module",
      });
      /******/
    }
    /******/ Object.defineProperty(exports, "__esModule", { value: true });
    /******/
  }; // create a fake namespace object // mode & 1: value is a module id, require it // mode & 2: merge all properties of value into the ns // mode & 4: return value when already ns object // mode & 8|1: behave like require
  /******/
  /******/ /******/ /******/ /******/ /******/ /******/ __webpack_require__.t = function (
    value,
    mode
  ) {
    /******/ if (mode & 1) value = __webpack_require__(value);
    /******/ if (mode & 8) return value;
    /******/ if (
      mode & 4 &&
      typeof value === "object" &&
      value &&
      value.__esModule
    )
      return value;
    /******/ var ns = Object.create(null);
    /******/ __webpack_require__.r(ns);
    /******/ Object.defineProperty(ns, "default", {
      enumerable: true,
      value: value,
    });
    /******/ if (mode & 2 && typeof value != "string")
      for (var key in value)
        __webpack_require__.d(
          ns,
          key,
          function (key) {
            return value[key];
          }.bind(null, key)
        );
    /******/ return ns;
    /******/
  }; // getDefaultExport function for compatibility with non-harmony modules
  /******/
  /******/ /******/ __webpack_require__.n = function (module) {
    /******/ var getter =
      module && module.__esModule
        ? /******/ function getDefault() {
            return module["default"];
          }
        : /******/ function getModuleExports() {
            return module;
          };
    /******/ __webpack_require__.d(getter, "a", getter);
    /******/ return getter;
    /******/
  }; // Object.prototype.hasOwnProperty.call
  /******/
  /******/ /******/ __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  }; // __webpack_public_path__
  /******/
  /******/ /******/ __webpack_require__.p = ""; // __webpack_hash__
  /******/
  /******/ /******/ __webpack_require__.h = function () {
    return hotCurrentHash;
  }; // Load entry module and return exports
  /******/
  /******/
  /******/ /******/ return hotCreateRequire(3)((__webpack_require__.s = 3));
  /******/
})(
  /************************************************************************/
  /******/ [
    /* 0 */
    /***/ function (module, exports, __webpack_require__) {
      !(function (t, e) {
        true
          ? e(exports, __webpack_require__(4), __webpack_require__(5))
          : undefined;
      })(this, function (t, e, n) {
        "use strict";
        function i(t) {
          return t && "object" == typeof t && "default" in t
            ? t
            : { default: t };
        }
        var r = i(e),
          s = i(n);
        function a(t) {
          return (a =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                })(t);
        }
        function o(t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        }
        function u(t, e) {
          for (var n = 0; n < e.length; n++) {
            var i = e[n];
            (i.enumerable = i.enumerable || !1),
              (i.configurable = !0),
              "value" in i && (i.writable = !0),
              Object.defineProperty(t, i.key, i);
          }
        }
        function l(t, e, n) {
          return e && u(t.prototype, e), n && u(t, n), t;
        }
        function c(t, e, n) {
          return (
            e in t
              ? Object.defineProperty(t, e, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = n),
            t
          );
        }
        function h(t, e) {
          var n = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var i = Object.getOwnPropertySymbols(t);
            e &&
              (i = i.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              n.push.apply(n, i);
          }
          return n;
        }
        function p(t) {
          for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? h(Object(n), !0).forEach(function (e) {
                  c(t, e, n[e]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
              : h(Object(n)).forEach(function (e) {
                  Object.defineProperty(
                    t,
                    e,
                    Object.getOwnPropertyDescriptor(n, e)
                  );
                });
          }
          return t;
        }
        function d(t, e) {
          if ("function" != typeof e && null !== e)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            e && m(t, e);
        }
        function f(t) {
          return (f = Object.setPrototypeOf
            ? Object.getPrototypeOf
            : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t);
              })(t);
        }
        function m(t, e) {
          return (m =
            Object.setPrototypeOf ||
            function (t, e) {
              return (t.__proto__ = e), t;
            })(t, e);
        }
        function v(t) {
          if (void 0 === t)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          return t;
        }
        function y(t, e) {
          return !e || ("object" != typeof e && "function" != typeof e)
            ? v(t)
            : e;
        }
        function g(t) {
          var e = (function () {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
              return (
                Boolean.prototype.valueOf.call(
                  Reflect.construct(Boolean, [], function () {})
                ),
                !0
              );
            } catch (t) {
              return !1;
            }
          })();
          return function () {
            var n,
              i = f(t);
            if (e) {
              var r = f(this).constructor;
              n = Reflect.construct(i, arguments, r);
            } else n = i.apply(this, arguments);
            return y(this, n);
          };
        }
        function b(t, e) {
          for (
            ;
            !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = f(t));

          );
          return t;
        }
        function k(t, e, n) {
          return (k =
            "undefined" != typeof Reflect && Reflect.get
              ? Reflect.get
              : function (t, e, n) {
                  var i = b(t, e);
                  if (i) {
                    var r = Object.getOwnPropertyDescriptor(i, e);
                    return r.get ? r.get.call(n) : r.value;
                  }
                })(t, e, n || t);
        }
        function x(t, e, n, i) {
          return (x =
            "undefined" != typeof Reflect && Reflect.set
              ? Reflect.set
              : function (t, e, n, i) {
                  var r,
                    s = b(t, e);
                  if (s) {
                    if ((r = Object.getOwnPropertyDescriptor(s, e)).set)
                      return r.set.call(i, n), !0;
                    if (!r.writable) return !1;
                  }
                  if ((r = Object.getOwnPropertyDescriptor(i, e))) {
                    if (!r.writable) return !1;
                    (r.value = n), Object.defineProperty(i, e, r);
                  } else c(i, e, n);
                  return !0;
                })(t, e, n, i);
        }
        function w(t, e, n, i, r) {
          if (!x(t, e, n, i || t) && r)
            throw new Error("failed to set property");
          return n;
        }
        function C(t, e) {
          return (
            I(t) ||
            (function (t, e) {
              if (
                "undefined" == typeof Symbol ||
                !(Symbol.iterator in Object(t))
              )
                return;
              var n = [],
                i = !0,
                r = !1,
                s = void 0;
              try {
                for (
                  var a, o = t[Symbol.iterator]();
                  !(i = (a = o.next()).done) &&
                  (n.push(a.value), !e || n.length !== e);
                  i = !0
                );
              } catch (t) {
                (r = !0), (s = t);
              } finally {
                try {
                  i || null == o.return || o.return();
                } finally {
                  if (r) throw s;
                }
              }
              return n;
            })(t, e) ||
            E(t, e) ||
            _()
          );
        }
        function O(t) {
          return (
            (function (t) {
              if (Array.isArray(t)) return A(t);
            })(t) ||
            P(t) ||
            E(t) ||
            (function () {
              throw new TypeError(
                "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
              );
            })()
          );
        }
        function I(t) {
          if (Array.isArray(t)) return t;
        }
        function P(t) {
          if ("undefined" != typeof Symbol && Symbol.iterator in Object(t))
            return Array.from(t);
        }
        function E(t, e) {
          if (t) {
            if ("string" == typeof t) return A(t, e);
            var n = Object.prototype.toString.call(t).slice(8, -1);
            return (
              "Object" === n && t.constructor && (n = t.constructor.name),
              "Map" === n || "Set" === n
                ? Array.from(t)
                : "Arguments" === n ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                ? A(t, e)
                : void 0
            );
          }
        }
        function A(t, e) {
          (null == e || e > t.length) && (e = t.length);
          for (var n = 0, i = new Array(e); n < e; n++) i[n] = t[n];
          return i;
        }
        function _() {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        }
        function D(t) {
          var e = (function (t, e) {
            if ("object" != typeof t || null === t) return t;
            var n = t[Symbol.toPrimitive];
            if (void 0 !== n) {
              var i = n.call(t, e || "default");
              if ("object" != typeof i) return i;
              throw new TypeError(
                "@@toPrimitive must return a primitive value."
              );
            }
            return ("string" === e ? String : Number)(t);
          })(t, "string");
          return "symbol" == typeof e ? e : String(e);
        }
        function T(t, e, n, i) {
          var r = S();
          if (i) for (var s = 0; s < i.length; s++) r = i[s](r);
          var a = e(function (t) {
              r.initializeInstanceElements(t, o.elements);
            }, n),
            o = r.decorateClass(
              (function (t) {
                for (
                  var e = [],
                    n = function (t) {
                      return (
                        "method" === t.kind &&
                        t.key === s.key &&
                        t.placement === s.placement
                      );
                    },
                    i = 0;
                  i < t.length;
                  i++
                ) {
                  var r,
                    s = t[i];
                  if ("method" === s.kind && (r = e.find(n)))
                    if (N(s.descriptor) || N(r.descriptor)) {
                      if (V(s) || V(r))
                        throw new ReferenceError(
                          "Duplicated methods (" +
                            s.key +
                            ") can't be decorated."
                        );
                      r.descriptor = s.descriptor;
                    } else {
                      if (V(s)) {
                        if (V(r))
                          throw new ReferenceError(
                            "Decorators can't be placed on different accessors with for the same property (" +
                              s.key +
                              ")."
                          );
                        r.decorators = s.decorators;
                      }
                      j(s, r);
                    }
                  else e.push(s);
                }
                return e;
              })(a.d.map(M)),
              t
            );
          return (
            r.initializeClassElements(a.F, o.elements),
            r.runClassFinishers(a.F, o.finishers)
          );
        }
        function S() {
          S = function () {
            return t;
          };
          var t = {
            elementsDefinitionOrder: [["method"], ["field"]],
            initializeInstanceElements: function (t, e) {
              ["method", "field"].forEach(function (n) {
                e.forEach(function (e) {
                  e.kind === n &&
                    "own" === e.placement &&
                    this.defineClassElement(t, e);
                }, this);
              }, this);
            },
            initializeClassElements: function (t, e) {
              var n = t.prototype;
              ["method", "field"].forEach(function (i) {
                e.forEach(function (e) {
                  var r = e.placement;
                  if (e.kind === i && ("static" === r || "prototype" === r)) {
                    var s = "static" === r ? t : n;
                    this.defineClassElement(s, e);
                  }
                }, this);
              }, this);
            },
            defineClassElement: function (t, e) {
              var n = e.descriptor;
              if ("field" === e.kind) {
                var i = e.initializer;
                n = {
                  enumerable: n.enumerable,
                  writable: n.writable,
                  configurable: n.configurable,
                  value: void 0 === i ? void 0 : i.call(t),
                };
              }
              Object.defineProperty(t, e.key, n);
            },
            decorateClass: function (t, e) {
              var n = [],
                i = [],
                r = { static: [], prototype: [], own: [] };
              if (
                (t.forEach(function (t) {
                  this.addElementPlacement(t, r);
                }, this),
                t.forEach(function (t) {
                  if (!V(t)) return n.push(t);
                  var e = this.decorateElement(t, r);
                  n.push(e.element),
                    n.push.apply(n, e.extras),
                    i.push.apply(i, e.finishers);
                }, this),
                !e)
              )
                return { elements: n, finishers: i };
              var s = this.decorateConstructor(n, e);
              return i.push.apply(i, s.finishers), (s.finishers = i), s;
            },
            addElementPlacement: function (t, e, n) {
              var i = e[t.placement];
              if (!n && -1 !== i.indexOf(t.key))
                throw new TypeError("Duplicated element (" + t.key + ")");
              i.push(t.key);
            },
            decorateElement: function (t, e) {
              for (
                var n = [], i = [], r = t.decorators, s = r.length - 1;
                s >= 0;
                s--
              ) {
                var a = e[t.placement];
                a.splice(a.indexOf(t.key), 1);
                var o = this.fromElementDescriptor(t),
                  u = this.toElementFinisherExtras((0, r[s])(o) || o);
                (t = u.element),
                  this.addElementPlacement(t, e),
                  u.finisher && i.push(u.finisher);
                var l = u.extras;
                if (l) {
                  for (var c = 0; c < l.length; c++)
                    this.addElementPlacement(l[c], e);
                  n.push.apply(n, l);
                }
              }
              return { element: t, finishers: i, extras: n };
            },
            decorateConstructor: function (t, e) {
              for (var n = [], i = e.length - 1; i >= 0; i--) {
                var r = this.fromClassDescriptor(t),
                  s = this.toClassDescriptor((0, e[i])(r) || r);
                if (
                  (void 0 !== s.finisher && n.push(s.finisher),
                  void 0 !== s.elements)
                ) {
                  t = s.elements;
                  for (var a = 0; a < t.length - 1; a++)
                    for (var o = a + 1; o < t.length; o++)
                      if (
                        t[a].key === t[o].key &&
                        t[a].placement === t[o].placement
                      )
                        throw new TypeError(
                          "Duplicated element (" + t[a].key + ")"
                        );
                }
              }
              return { elements: t, finishers: n };
            },
            fromElementDescriptor: function (t) {
              var e = {
                kind: t.kind,
                key: t.key,
                placement: t.placement,
                descriptor: t.descriptor,
              };
              return (
                Object.defineProperty(e, Symbol.toStringTag, {
                  value: "Descriptor",
                  configurable: !0,
                }),
                "field" === t.kind && (e.initializer = t.initializer),
                e
              );
            },
            toElementDescriptors: function (t) {
              var e;
              if (void 0 !== t)
                return ((e = t), I(e) || P(e) || E(e) || _()).map(function (t) {
                  var e = this.toElementDescriptor(t);
                  return (
                    this.disallowProperty(
                      t,
                      "finisher",
                      "An element descriptor"
                    ),
                    this.disallowProperty(t, "extras", "An element descriptor"),
                    e
                  );
                }, this);
            },
            toElementDescriptor: function (t) {
              var e = String(t.kind);
              if ("method" !== e && "field" !== e)
                throw new TypeError(
                  'An element descriptor\'s .kind property must be either "method" or "field", but a decorator created an element descriptor with .kind "' +
                    e +
                    '"'
                );
              var n = D(t.key),
                i = String(t.placement);
              if ("static" !== i && "prototype" !== i && "own" !== i)
                throw new TypeError(
                  'An element descriptor\'s .placement property must be one of "static", "prototype" or "own", but a decorator created an element descriptor with .placement "' +
                    i +
                    '"'
                );
              var r = t.descriptor;
              this.disallowProperty(t, "elements", "An element descriptor");
              var s = {
                kind: e,
                key: n,
                placement: i,
                descriptor: Object.assign({}, r),
              };
              return (
                "field" !== e
                  ? this.disallowProperty(
                      t,
                      "initializer",
                      "A method descriptor"
                    )
                  : (this.disallowProperty(
                      r,
                      "get",
                      "The property descriptor of a field descriptor"
                    ),
                    this.disallowProperty(
                      r,
                      "set",
                      "The property descriptor of a field descriptor"
                    ),
                    this.disallowProperty(
                      r,
                      "value",
                      "The property descriptor of a field descriptor"
                    ),
                    (s.initializer = t.initializer)),
                s
              );
            },
            toElementFinisherExtras: function (t) {
              return {
                element: this.toElementDescriptor(t),
                finisher: $(t, "finisher"),
                extras: this.toElementDescriptors(t.extras),
              };
            },
            fromClassDescriptor: function (t) {
              var e = {
                kind: "class",
                elements: t.map(this.fromElementDescriptor, this),
              };
              return (
                Object.defineProperty(e, Symbol.toStringTag, {
                  value: "Descriptor",
                  configurable: !0,
                }),
                e
              );
            },
            toClassDescriptor: function (t) {
              var e = String(t.kind);
              if ("class" !== e)
                throw new TypeError(
                  'A class descriptor\'s .kind property must be "class", but a decorator created a class descriptor with .kind "' +
                    e +
                    '"'
                );
              this.disallowProperty(t, "key", "A class descriptor"),
                this.disallowProperty(t, "placement", "A class descriptor"),
                this.disallowProperty(t, "descriptor", "A class descriptor"),
                this.disallowProperty(t, "initializer", "A class descriptor"),
                this.disallowProperty(t, "extras", "A class descriptor");
              var n = $(t, "finisher");
              return {
                elements: this.toElementDescriptors(t.elements),
                finisher: n,
              };
            },
            runClassFinishers: function (t, e) {
              for (var n = 0; n < e.length; n++) {
                var i = (0, e[n])(t);
                if (void 0 !== i) {
                  if ("function" != typeof i)
                    throw new TypeError("Finishers must return a constructor.");
                  t = i;
                }
              }
              return t;
            },
            disallowProperty: function (t, e, n) {
              if (void 0 !== t[e])
                throw new TypeError(n + " can't have a ." + e + " property.");
            },
          };
          return t;
        }
        function M(t) {
          var e,
            n = D(t.key);
          "method" === t.kind
            ? (e = {
                value: t.value,
                writable: !0,
                configurable: !0,
                enumerable: !1,
              })
            : "get" === t.kind
            ? (e = { get: t.value, configurable: !0, enumerable: !1 })
            : "set" === t.kind
            ? (e = { set: t.value, configurable: !0, enumerable: !1 })
            : "field" === t.kind &&
              (e = { configurable: !0, writable: !0, enumerable: !0 });
          var i = {
            kind: "field" === t.kind ? "field" : "method",
            key: n,
            placement: t.static
              ? "static"
              : "field" === t.kind
              ? "own"
              : "prototype",
            descriptor: e,
          };
          return (
            t.decorators && (i.decorators = t.decorators),
            "field" === t.kind && (i.initializer = t.value),
            i
          );
        }
        function j(t, e) {
          void 0 !== t.descriptor.get
            ? (e.descriptor.get = t.descriptor.get)
            : (e.descriptor.set = t.descriptor.set);
        }
        function V(t) {
          return t.decorators && t.decorators.length;
        }
        function N(t) {
          return void 0 !== t && !(void 0 === t.value && void 0 === t.writable);
        }
        function $(t, e) {
          var n = t[e];
          if (void 0 !== n && "function" != typeof n)
            throw new TypeError("Expected '" + e + "' to be a function");
          return n;
        }
        var B = [
            {
              key: "info",
              style: "color: #666;",
              level: 5,
              consoleMethod: "log",
            },
            {
              key: "notice",
              style:
                "background: rgba(0, 0, 0, 0.8); color:white; padding:8px;",
              level: 4,
              consoleMethod: "log",
            },
            {
              key: "warning",
              style: "color: black; background: orange;",
              level: 2,
              consoleMethod: "warn",
            },
            {
              key: "error",
              style: "color: black; background: red;",
              level: 1,
              consoleMethod: "error",
            },
          ],
          L = "data-motorcortex2-id",
          F = "closed",
          R = "MotorCortex",
          z = 2,
          G = {
            staggerPreface: "@stagger",
            mathExpPreface: "@expression",
            attibuteValue: "@attribute",
            patternValue: "@pattern",
            dynamicDuration: "dynamic",
            totalElements: "total",
            elementIndex: "index",
            initParams: "initParams",
          };
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        var q = new window.AudioContext();
        function K(t) {
          return "number" == typeof t && isFinite(t);
        }
        function J(t) {
          return !isNaN(parseFloat(t)) && isFinite(t);
        }
        function W(t) {
          return "string" == typeof t || t instanceof String;
        }
        function H(t) {
          return "object" === a(t);
        }
        function U(t) {
          return t && "[object Function]" === {}.toString.call(t);
        }
        function Q(t) {
          return t.charAt(0).toUpperCase() + t.slice(1);
        }
        var X = new RegExp("^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)", "gi");
        function Z(t) {
          if (null === t && void 0 === t)
            return { result: !0, analysis: { width: null, height: null } };
          if (!H(t))
            return {
              result: !1,
              errors: [
                'originalDims should be an object containing the "width" and "height" keys',
              ],
            };
          if (
            !Object.prototype.hasOwnProperty.call(t, "width") ||
            !Object.prototype.hasOwnProperty.call(t, "height")
          )
            return {
              result: !1,
              errors: [
                'originalDims should be an object containing both the "width" and "height" keys',
              ],
            };
          if (!W(t.width))
            return {
              result: !1,
              errors: [
                "originalDims.width should be defined either on px or %.",
              ],
            };
          if (!W(t.height))
            return {
              result: !1,
              errors: [
                "originalDims.height should be defined either on px or %.",
              ],
            };
          var e = t.width.match(X)[0],
            n = t.width.substring(e.length);
          if (!K(Number(e)) || ("%" !== n && "px" !== n))
            return {
              result: !1,
              errors: [
                "originalDims.width should be defined either on px or %.",
              ],
            };
          var i = t.height.match(X)[0],
            r = t.height.substring(i.length);
          return !K(Number(i)) || ("%" != r && "px" != r)
            ? {
                result: !1,
                errors: [
                  "originalDims.heigth should be defined either on px or %.",
                ],
              }
            : { result: !0, analysis: Y(t) };
        }
        function Y(t) {
          var e = null,
            n = null;
          if (H(t) && null != t) {
            if (
              Object.prototype.hasOwnProperty.call(t, "width") &&
              W(t.width)
            ) {
              var i = t.width.match(X)[0],
                r = t.width.substring(i.length);
              !K(Number(i)) ||
                ("%" !== r && "px" !== r) ||
                (e = { number: Number(i), unit: r });
            }
            if (
              Object.prototype.hasOwnProperty.call(t, "height") &&
              W(t.height)
            ) {
              var s = t.height.match(X)[0],
                a = t.height.substring(s.length);
              !K(Number(s)) ||
                ("%" !== a && "px" !== a) ||
                (n = { number: Number(s), unit: a });
            }
          }
          return { width: e, height: n };
        }
        function tt(t) {
          var e = t.replace(/ /g, "");
          return /.*\((.*)\).*/.exec(e)[1].split(",");
        }
        function et(t, e) {
          return Math.round(t / e) * e;
        }
        function nt(t) {
          var e = t.split("___");
          return { mcid: e[0], attribute: e[1] };
        }
        function it() {
          return Math.floor(65536 * (1 + Math.random()))
            .toString(16)
            .substring(1);
        }
        function rt() {
          var t =
              arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
            e = t ? "_" : "-";
          return ""
            .concat(it())
            .concat(it())
            .concat(e)
            .concat(it())
            .concat(e)
            .concat(it());
        }
        function st(t, e) {
          return "".concat(t).concat("___").concat(e);
        }
        function at(t, e, n) {
          for (var i = e.split("."), r = t, s = 0; s < i.length - 1; s++) {
            if (!Object.prototype.hasOwnProperty.call(r, i[s])) return !1;
            r = r[i[s]];
          }
          return (
            !!Object.prototype.hasOwnProperty.call(r, i[i.length - 1]) &&
            ((r[i[i.length - 1]] = n), !0)
          );
        }
        var ot = new ((function () {
          function t(e) {
            o(this, t);
            var n = z;
            e &&
              Object.prototype.hasOwnProperty.call(e, "logLevel") &&
              (n = e.logLevel);
            for (var i = 0; i < B.length; i++) {
              var r = B[i];
              n >= r.level
                ? (this[r.key] = window.console[r.consoleMethod].bind(
                    window.console,
                    "MotorCortex - ".concat(r.key, ": ")
                  ))
                : (this[r.key] = function () {});
            }
            this.log =
              n >= 3
                ? window.console.log.bind(window.console, "MotorCortex - ")
                : function () {};
          }
          return (
            l(t, [
              {
                key: "validateProps",
                value: function (t, e, n) {
                  var i = e(t);
                  if (i.length > 0) {
                    for (
                      var r = "Error on plugin's \""
                          .concat(n.plugin_npm_name, '" "')
                          .concat(
                            n.ClassName,
                            '" instantiation. Errors (op props):'
                          ),
                        s = 0;
                      s < i.length;
                      s++
                    )
                      r += "\n - "
                        .concat(i[s].message, ". ")
                        .concat(i[s].actual, " provided");
                    return this.error(r), { result: !1, errors: i };
                  }
                  return { result: !0 };
                },
              },
              {
                key: "getElementByMCID",
                value: function (t, e) {
                  return t.rootElement.querySelectorAll(
                    "[".concat(L, '="').concat(e, '"]')
                  )[0];
                },
              },
              {
                key: "buildInitialValuesValidationRules",
                value: function (t) {
                  var e = JSON.parse(JSON.stringify(t));
                  return (
                    (function t(e) {
                      if (
                        (("string" == typeof e || e instanceof String) &&
                          (e = { type: e }),
                        (e.optional = !0),
                        "object" === e.type)
                      )
                        for (var n in e.props) t(e.props[n]);
                    })(e),
                    e
                  );
                },
              },
              {
                key: "systoleDiastoleProjections",
                value: function (t, e, n) {
                  for (var i = [], r = 0; r < t.length; r++) {
                    var s = t[r],
                      a = s.parentMillisecond - n;
                    (a = a * e + n),
                      1 !== e &&
                        i.push({
                          id: s.incident.id,
                          start: a,
                          end: a + s.incident.duration * e,
                          startDelta: a - s.millisecond,
                        });
                  }
                  return i;
                },
              },
            ]),
            t
          );
        })())();
        function ut(t) {
          return t.result
            ? { result: !0, execute: t.execute }
            : { result: !1, errors: t.errors };
        }
        var lt = (function () {
            function t(e) {
              o(this, t),
                (this.runTimeInfo = e.runTimeInfo),
                (this.context = e.context),
                this.onInitialise(),
                (this.getIncidentById = e.getIncidentById);
            }
            return (
              l(
                t,
                [
                  { key: "onInitialise", value: function () {} },
                  {
                    key: "_resize",
                    value: function () {
                      ot.log(
                        "Please overwite the _resize method of the Channel"
                      );
                    },
                  },
                  {
                    key: "addIncidents",
                    value: function (t) {
                      return ut(this.checkAddition(t));
                    },
                  },
                  {
                    key: "editIncidents",
                    value: function (t, e) {
                      return ut(this.checkEdit(t, e));
                    },
                  },
                  {
                    key: "removeIncidents",
                    value: function (t) {
                      var e =
                        arguments.length > 1 && void 0 !== arguments[1]
                          ? arguments[1]
                          : {};
                      return ut(this.checkDelete(t, e));
                    },
                  },
                  { key: "recalcScratchValues", value: function (t) {} },
                  {
                    key: "checkAddition",
                    value: function (t) {
                      return { result: !0, execute: function () {} };
                    },
                  },
                  {
                    key: "checkEdit",
                    value: function (t, e) {
                      return { result: !0, execute: function () {} };
                    },
                  },
                  {
                    key: "checkDelete",
                    value: function (t) {
                      return { result: !0, execute: function () {} };
                    },
                  },
                  {
                    key: "checkResizedIncidents",
                    value: function (t) {
                      return { result: !0, execute: function () {} };
                    },
                  },
                  { key: "moveTo", value: function (t, e, n) {} },
                ],
                [
                  {
                    key: "type",
                    get: function () {
                      return "plain";
                    },
                  },
                ]
              ),
              t
            );
          })(),
          ct = "up",
          ht = "down",
          pt = "native.tree.bypass",
          dt = (function () {
            function t() {
              var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {};
              o(this, t),
                (this.parentNode = null),
                (this.isNode = !1),
                Object.prototype.hasOwnProperty.call(e, "id")
                  ? (this.id = e.id)
                  : (this.id = rt()),
                (this.props = e);
            }
            return (
              l(t, [
                {
                  key: "name",
                  get: function () {
                    return Object.prototype.hasOwnProperty.call(
                      this.props,
                      "name"
                    )
                      ? this.props.name
                      : null;
                  },
                  set: function (t) {
                    this.props.name = t;
                  },
                },
                {
                  key: "delay",
                  get: function () {
                    return Object.prototype.hasOwnProperty.call(
                      this.props,
                      "delay"
                    )
                      ? this.props.delay
                      : 0;
                  },
                  set: function (t) {
                    0 !== t && (this.props.delay = t);
                  },
                },
                {
                  key: "hiatus",
                  get: function () {
                    return Object.prototype.hasOwnProperty.call(
                      this.props,
                      "hiatus"
                    )
                      ? this.props.hiatus
                      : 0;
                  },
                  set: function (t) {
                    0 !== t && (this.props.hiatus = t);
                  },
                },
                {
                  key: "repeats",
                  get: function () {
                    return Object.prototype.hasOwnProperty.call(
                      this.props,
                      "repeats"
                    )
                      ? this.props.repeats
                      : 1;
                  },
                  set: function (t) {
                    this.props.repeats = t;
                  },
                },
                {
                  key: "duration",
                  get: function () {
                    return (
                      this.repeats *
                      (this.delay + this.props.duration + this.hiatus)
                    );
                  },
                  set: function (t) {
                    var e = t / this.duration;
                    (this.props.duration *= e),
                      (this.hiatus *= e),
                      (this.delay *= e);
                  },
                },
                {
                  key: "setNewDuration",
                  value: function (t) {
                    (this.duration = t),
                      this.putMessageOnPipe("recalcDuration", {}, "Groups", {
                        selfExecute: !1,
                        direction: ct,
                      });
                  },
                },
                {
                  key: "systoleDiastole",
                  value: function (t) {
                    this.duration *= t;
                  },
                },
                {
                  key: "hasParent",
                  get: function () {
                    return null !== this.parentNode;
                  },
                },
                {
                  key: "attachToNode",
                  value: function (t) {
                    this.parentNode = t;
                  },
                },
                {
                  key: "detachFromParent",
                  value: function () {
                    this.parentNode = null;
                  },
                },
                {
                  key: "putMessageOnPipe",
                  value: function (t, e, n) {
                    var i =
                      arguments.length > 3 && void 0 !== arguments[3]
                        ? arguments[3]
                        : {};
                    if (
                      (Object.prototype.hasOwnProperty.call(i, "direction") ||
                        (i.direction = ht),
                      i.direction !== ht ||
                        Object.prototype.hasOwnProperty.call(
                          i,
                          "positionDelta"
                        ) ||
                        (i.positionDelta = 0),
                      i.selfExecute)
                    ) {
                      var r = "handle".concat(Q(t)),
                        s = "function" == typeof this[r];
                      if (s) {
                        var a = this[r](n, e);
                        if (a !== pt) {
                          var o = { response: a, responder: this };
                          return i.direction === ct
                            ? o
                            : [
                                p(
                                  p({}, o),
                                  {},
                                  { positionDelta: i.positionDelta }
                                ),
                              ];
                        }
                      }
                    }
                    return i.direction === ct
                      ? this.hasParent
                        ? this.parentNode.putMessageOnPipe(t, e, n, {
                            selfExecute: !0,
                            direction: ct,
                          })
                        : { response: !1, responder: null }
                      : [];
                  },
                },
                {
                  key: "bypass",
                  value: function () {
                    return pt;
                  },
                },
                {
                  key: "positionOnPyramidion",
                  get: function () {
                    return this.getPositionOnPyramidion();
                  },
                },
                {
                  key: "getPositionOnPyramidion",
                  value: function () {
                    var t =
                      arguments.length > 0 && void 0 !== arguments[0]
                        ? arguments[0]
                        : 0;
                    if (this.hasParent) {
                      var e = this.putMessageOnPipe(
                        "getPositionOnPyramidion",
                        { delta: t, id: this.id },
                        "Parent",
                        { selfExecute: !1, direction: ct }
                      );
                      return e.response;
                    }
                    return t;
                  },
                },
              ]),
              t
            );
          })(),
          ft = "Leaf has already been attached to another Node",
          mt = "Negative positioning of childs on nodes is not allowed",
          vt = "The Leaf with the requested id couldn't be found on the Tree",
          yt = (function (t) {
            d(n, t);
            var e = g(n);
            function n() {
              var t,
                i =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : {};
              return (
                o(this, n),
                ((t = e.call(this, i)).isNode = !0),
                (t.children = {}),
                (t.calculatedDuration = 0),
                t
              );
            }
            return (
              l(n, [
                {
                  key: "duration",
                  get: function () {
                    return (
                      this.repeats *
                      (this.delay + this.calculatedDuration + this.hiatus)
                    );
                  },
                  set: function (t) {
                    if (0 !== this.duration) {
                      var e = t / this.duration;
                      for (var n in ((this.calculatedDuration *= e),
                      (this.hiatus *= e),
                      (this.delay *= e),
                      this.children)) {
                        var i = this.children[n];
                        this.editPosition(i.id, i.position * e, !0),
                          i.leaf.systoleDiastole(e);
                      }
                    }
                  },
                },
                {
                  key: "_calculateDuration",
                  value: function () {
                    var t = 0;
                    for (var e in this.children) {
                      var n = this.children[e];
                      n.position + n.leaf.duration > t &&
                        (t = n.position + n.leaf.duration);
                    }
                    return (
                      t !== this.calculatedDuration &&
                      ((this.calculatedDuration = t), !0)
                    );
                  },
                },
                {
                  key: "handleRecalcDuration",
                  value: function (t, e) {
                    return (
                      !this._calculateDuration() ||
                      this.putMessageOnPipe("recalcDuration", {}, "Groups", {
                        selfExecute: !1,
                        direction: ct,
                      })
                    );
                  },
                },
                {
                  key: "getLeafById",
                  value: function (t) {
                    var e =
                      arguments.length > 1 &&
                      void 0 !== arguments[1] &&
                      arguments[1];
                    if (Object.prototype.hasOwnProperty.call(this.children, t))
                      return this.children[t].leaf;
                    if (e) return null;
                    for (var n in this.children) {
                      var i = this.children[n].leaf;
                      if (i.isNode) {
                        var r = i.getLeafById(t);
                        if (null != r) return r;
                      }
                    }
                    return null;
                  },
                },
                {
                  key: "getLeafPosition",
                  value: function (t) {
                    if (Object.prototype.hasOwnProperty.call(this.children, t))
                      return this.children[t].position;
                    var e = this.putMessageOnPipe(
                      "getLeafPosition",
                      { id: t },
                      "Groups",
                      { selfExecute: !1, direction: ht }
                    );
                    return e.length > 0
                      ? e[0].positionDelta + e[0].response
                      : void 0;
                  },
                },
                {
                  key: "handleGetLeafPosition",
                  value: function (t, e) {
                    return this.getLeafPosition(e.id);
                  },
                },
                {
                  key: "checkAddition",
                  value: function (t, e) {
                    return t.hasParent
                      ? { result: !1, reason: ft }
                      : e < 0
                      ? { result: !1, reason: mt }
                      : { result: !0 };
                  },
                },
                {
                  key: "addChild",
                  value: function (t, e) {
                    return t.hasParent
                      ? { result: !1, reason: ft }
                      : ((this.children[t.id] = {
                          id: t.id,
                          leaf: t,
                          position: e,
                        }),
                        t.attachToNode(this),
                        this.putMessageOnPipe("recalcDuration", {}, "Groups", {
                          selfExecute: !0,
                          direction: ct,
                        }),
                        { result: !0 });
                  },
                },
                {
                  key: "checkRemoveChild",
                  value: function (t) {
                    return Object.prototype.hasOwnProperty.call(
                      this.children,
                      t
                    )
                      ? { result: !0 }
                      : { result: !1, reason: vt };
                  },
                },
                {
                  key: "removeChild",
                  value: function (t) {
                    return (
                      this.children[t].leaf.detachFromParent(),
                      delete this.children[t],
                      this.putMessageOnPipe("recalcDuration", {}, "Groups", {
                        selfExecute: !0,
                        direction: ct,
                      }),
                      { result: !0 }
                    );
                  },
                },
                {
                  key: "checkEditPosition",
                  value: function (t, e) {
                    return e < 0
                      ? { result: !1, reason: mt }
                      : Object.prototype.hasOwnProperty.call(this.children, t)
                      ? { result: !0 }
                      : { result: !1, reason: vt };
                  },
                },
                {
                  key: "editPosition",
                  value: function (t, e) {
                    var n =
                      arguments.length > 2 &&
                      void 0 !== arguments[2] &&
                      arguments[2];
                    if (Object.prototype.hasOwnProperty.call(this.children, t))
                      return (
                        (this.children[t].position = e),
                        n ||
                          this.putMessageOnPipe(
                            "recalcDuration",
                            {},
                            "Groups",
                            { selfExecute: !0, direction: ct }
                          ),
                        { result: !0 }
                      );
                  },
                },
                {
                  key: "putMessageOnPipe",
                  value: function (t, e, i) {
                    var r =
                      arguments.length > 3 && void 0 !== arguments[3]
                        ? arguments[3]
                        : {};
                    if (
                      (Object.prototype.hasOwnProperty.call(r, "direction") ||
                        (r.direction = ht),
                      r.direction !== ht ||
                        Object.prototype.hasOwnProperty.call(
                          r,
                          "positionDelta"
                        ) ||
                        (r.positionDelta = 0),
                      r.direction === ct)
                    )
                      return k(f(n.prototype), "putMessageOnPipe", this).call(
                        this,
                        t,
                        e,
                        i,
                        r
                      );
                    var s = k(f(n.prototype), "putMessageOnPipe", this).call(
                      this,
                      t,
                      e,
                      i,
                      r
                    );
                    if (s.length > 0) return s;
                    for (var a in this.children) {
                      var o = this.children[a].leaf,
                        u = p(
                          p({}, r),
                          {},
                          {
                            selfExecute: !0,
                            positionDelta:
                              r.positionDelta + this.children[a].position,
                          }
                        );
                      s.push.apply(s, O(o.putMessageOnPipe(t, e, i, u)));
                    }
                    return s;
                  },
                },
                {
                  key: "handleGetPositionOnPyramidion",
                  value: function (t, e) {
                    var n = e.delta + this.getLeafPosition(e.id);
                    return this.getPositionOnPyramidion(n);
                  },
                },
              ]),
              n
            );
          })(dt);
        function gt(t) {
          t.descriptor.value = function (t) {
            void 0 === this.blockID && (this.blockID = rt()),
              this.DescriptiveIncident.putMessageOnPipe(
                "setBlock",
                {
                  id: this.blockID,
                  description: t,
                  incidentId: this.DescriptiveIncident.id,
                  realIncidentId: this.id,
                },
                "rootClip",
                { selfExecute: !0, direction: ct }
              );
          };
        }
        function bt(t) {
          t.descriptor.value = function () {
            this.DescriptiveIncident.putMessageOnPipe(
              "unBlock",
              { id: this.blockID },
              "rootClip",
              { selfExecute: !0, direction: ct }
            );
          };
        }
        var kt = T(
            null,
            function (t, e) {
              var n = (function (e) {
                d(i, e);
                var n = g(i);
                function i(e, r) {
                  var s;
                  return (
                    o(this, i),
                    (s = n.call(this, r)),
                    t(v(s)),
                    (s.mc_plugin_npm_name = "motor-cortex-js"),
                    (s.plugin_channel_class = lt),
                    (s.hasIncidents = !0),
                    s.onGroupInitialise(),
                    (s.calculatedDuration = 0),
                    s
                  );
                }
                return i;
              })(e);
              return {
                F: n,
                d: [
                  {
                    kind: "method",
                    key: "onGroupInitialise",
                    value: function () {},
                  },
                  {
                    kind: "method",
                    key: "handleAddIncident",
                    value: function (t, e) {
                      if (this.id === t) {
                        var n = (0, e.incidentFromDescription)(
                          e.incident,
                          e.contextData,
                          e.audio
                        );
                        return null === n ? this.bypass() : n;
                      }
                      return this.bypass();
                    },
                  },
                  {
                    kind: "method",
                    key: "handleMoveIncident",
                    value: function (t, e) {
                      if (this.id === t) {
                        var n = this.getLeafById(e.incidentId, !0);
                        return null === n ? this.bypass() : n;
                      }
                      return this.bypass();
                    },
                  },
                  {
                    kind: "method",
                    key: "handleRemoveIncident",
                    value: function (t, e) {
                      if (this.id === t) {
                        var n = this.getLeafById(e.incidentId, !0);
                        return null === n ? this.bypass() : n;
                      }
                      return this.bypass();
                    },
                  },
                  {
                    kind: "method",
                    key: "handleResize",
                    value: function (t) {
                      return this.id === t ? this : this.bypass();
                    },
                  },
                  {
                    kind: "method",
                    key: "removeChild",
                    value: function (t) {
                      this.children[t].leaf.lastWish(),
                        k(f(n.prototype), "removeChild", this).call(this, t);
                    },
                  },
                  {
                    kind: "method",
                    key: "getIncidentsByChannel",
                    value: function () {
                      var t =
                          arguments.length > 0 && void 0 !== arguments[0]
                            ? arguments[0]
                            : 0,
                        e =
                          arguments.length > 1 && void 0 !== arguments[1]
                            ? arguments[1]
                            : 0,
                        n = {};
                      for (var i in ((n["motor-cortex-js"] = [
                        {
                          millisecond: t,
                          parentMillisecond: e,
                          incident: this,
                          id: this.id,
                        },
                      ]),
                      this.children)) {
                        var r = this.children[i],
                          s = r.leaf.getIncidentsByChannel(t + r.position, t);
                        for (var a in s)
                          Object.prototype.hasOwnProperty.call(n, a)
                            ? (n[a] = n[a].concat(s[a]))
                            : (n[a] = s[a]);
                      }
                      return n;
                    },
                  },
                  {
                    kind: "method",
                    key: "lastWish",
                    value: function () {
                      for (var t in this.children)
                        this.children[t].leaf.lastWish();
                    },
                  },
                  {
                    kind: "method",
                    decorators: [gt],
                    key: "setBlock",
                    value: function () {},
                  },
                  {
                    kind: "method",
                    decorators: [bt],
                    key: "unblock",
                    value: function () {},
                  },
                ],
              };
            },
            yt
          ),
          xt = (function (t) {
            d(n, t);
            var e = g(n);
            function n() {
              return o(this, n), e.apply(this, arguments);
            }
            return (
              l(n, [
                {
                  key: "onInitialise",
                  value: function () {
                    (this.incidents = []), (this.incidentsById = {});
                  },
                },
                {
                  key: "_incidentById",
                  value: function (t) {
                    return this.incidentsById[t];
                  },
                },
                {
                  key: "_resize",
                  value: function (t) {
                    for (var e = 0; e < this.incidents.length; e++)
                      this.incidents[e].millisecond *= t;
                  },
                },
                {
                  key: "checkAddition",
                  value: function (t) {
                    for (var e = [], n = {}, i = [], r = 0; r < t.length; r++)
                      (n[t[r].id] = t[r].incident),
                        i.push({ id: t[r].id, millisecond: t[r].millisecond }),
                        Object.prototype.hasOwnProperty.call(
                          this.incidentsById,
                          t[r].id
                        ) &&
                          (ot.error(
                            "Incident with the id ".concat(
                              t[r].id,
                              " already exists. Addition is rejected."
                            )
                          ),
                          e.push({
                            type: "Already existing id",
                            meta: { id: t[r].id },
                          }));
                    if (e.length > 0) return { result: !1, errors: e };
                    var s = this;
                    return {
                      result: !0,
                      execute: function () {
                        var e;
                        (s.incidentsById = Object.assign(s.incidentsById, n)),
                          (e = s.incidents).push.apply(e, i),
                          s.incidents.sort(function (t, e) {
                            return t.millisecond - e.millisecond;
                          });
                        for (var r = 0; r < t.length; r++)
                          s._incidentById(t[r].id)._onGetContextOnce(s.context);
                      },
                    };
                  },
                },
                {
                  key: "checkEdit",
                  value: function (t, e) {
                    var n = this.incidents;
                    return {
                      result: !0,
                      execute: function () {
                        for (var i, r = 0; r < t.length; r++) {
                          i = t[r].id;
                          for (var s = 0; s < n.length; s++)
                            if (n[s].id === i) {
                              n[s].millisecond += e;
                              break;
                            }
                        }
                        n.sort(function (t, e) {
                          return t.millisecond - e.millisecond;
                        });
                      },
                    };
                  },
                },
                {
                  key: "checkDelete",
                  value: function (t) {
                    for (var e = this, n = [], i = 0; i < t.length; i++)
                      n.push(t[i].id);
                    return {
                      result: !0,
                      execute: function () {
                        var t = e.incidents.filter(function (t) {
                          return !n.includes(t.id);
                        });
                        e.incidents = t;
                        for (var i = 0; i < n.length; i++)
                          delete e.incidentsById[n[i]];
                      },
                    };
                  },
                },
                {
                  key: "checkResizedIncidents",
                  value: function (t) {
                    var e = this.incidents;
                    return {
                      result: !0,
                      execute: function () {
                        for (var n, i = 0; i < t.length; i++) {
                          n = t[i].id;
                          for (var r = 0; r < e.length; r++)
                            if (e[r].id === n) {
                              e[r].millisecond += t[i].startDelta;
                              break;
                            }
                        }
                        e.sort(function (t, e) {
                          return t.millisecond - e.millisecond;
                        });
                      },
                    };
                  },
                },
                {
                  key: "moveTo",
                  value: function (t, e, n) {
                    var i =
                      arguments.length > 3 &&
                      void 0 !== arguments[3] &&
                      arguments[3];
                    if (i)
                      for (var r = 0; r < this.incidents.length; r++) {
                        var s = this.incidents[r],
                          a = this._incidentById(s.id);
                        e < s.millisecond
                          ? a.onProgress(0, 0, n, !0)
                          : e > s.millisecond + a.duration
                          ? a.onProgress(1, a.duration, n, !0)
                          : a.onProgress(
                              (e - s.millisecond) / a.duration,
                              e - s.millisecond,
                              n,
                              !0
                            );
                      }
                    else {
                      var o,
                        u = this;
                      o =
                        e > t
                          ? this.incidents.filter(function (n) {
                              return (
                                (n.millisecond +
                                  u._incidentById(n.id).duration >=
                                  t &&
                                  n.millisecond +
                                    u._incidentById(n.id).duration <=
                                    e) ||
                                (u._incidentById(n.id).duration +
                                  n.millisecond >=
                                  e &&
                                  n.millisecond <= e)
                              );
                            })
                          : this.incidents.filter(function (n) {
                              return (
                                (n.millisecond +
                                  u._incidentById(n.id).duration >=
                                  e &&
                                  n.millisecond +
                                    u._incidentById(n.id).duration <=
                                    t) ||
                                (u._incidentById(n.id).duration +
                                  n.millisecond >=
                                  t &&
                                  n.millisecond <= t)
                              );
                            });
                      for (var l = 0; l < o.length; l++) {
                        var c = o[l],
                          h = this._incidentById(c.id),
                          p = (e - c.millisecond) / h.duration >= 1,
                          d = p ? 1 : (e - c.millisecond) / h.duration,
                          f = p ? h.duration : e - c.millisecond;
                        h.onProgress(d, f, n, !1);
                      }
                    }
                  },
                },
              ]),
              n
            );
          })(lt),
          wt = 0.1,
          Ct = "function" == typeof Float32Array;
        function Ot(t, e) {
          return 1 - 3 * e + 3 * t;
        }
        function It(t, e) {
          return 3 * e - 6 * t;
        }
        function Pt(t) {
          return 3 * t;
        }
        function Et(t, e, n) {
          return ((Ot(e, n) * t + It(e, n)) * t + Pt(e)) * t;
        }
        function At(t, e, n) {
          return 3 * Ot(e, n) * t * t + 2 * It(e, n) * t + Pt(e);
        }
        function _t(t) {
          return t;
        }
        var Dt = function (t, e, n, i) {
          if (!(0 <= t && t <= 1 && 0 <= n && n <= 1))
            throw new Error("bezier x values must be in [0, 1] range");
          if (t === e && n === i) return _t;
          for (
            var r = Ct ? new Float32Array(11) : new Array(11), s = 0;
            s < 11;
            ++s
          )
            r[s] = Et(s * wt, t, n);
          function a(e) {
            for (var i = 0, s = 1; 10 !== s && r[s] <= e; ++s) i += wt;
            --s;
            var a = i + ((e - r[s]) / (r[s + 1] - r[s])) * wt,
              o = At(a, t, n);
            return o >= 0.001
              ? (function (t, e, n, i) {
                  for (var r = 0; r < 4; ++r) {
                    var s = At(e, n, i);
                    if (0 === s) return e;
                    e -= (Et(e, n, i) - t) / s;
                  }
                  return e;
                })(e, a, t, n)
              : 0 === o
              ? a
              : (function (t, e, n, i, r) {
                  var s,
                    a,
                    o = 0;
                  do {
                    (s = Et((a = e + (n - e) / 2), i, r) - t) > 0
                      ? (n = a)
                      : (e = a);
                  } while (Math.abs(s) > 1e-7 && ++o < 10);
                  return a;
                })(e, i, i + wt, t, n);
          }
          return function (t) {
            return 0 === t ? 0 : 1 === t ? 1 : Et(a(t), e, i);
          };
        };
        function Tt(t) {
          t.descriptor.value = function () {
            var t =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : 0,
              e =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : 0,
              n = {};
            return (
              (n[this.mc_plugin_npm_name] = [
                {
                  millisecond: t,
                  parentMillisecond: e,
                  incident: this,
                  id: this.id,
                },
              ]),
              n
            );
          };
        }
        var St = T(null, function (t) {
            return {
              F: function e() {
                var n =
                    arguments.length > 0 && void 0 !== arguments[0]
                      ? arguments[0]
                      : {},
                  i =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : {},
                  r = arguments.length > 2 ? arguments[2] : void 0;
                o(this, e),
                  t(this),
                  (this.attrs = n),
                  (this.props = i),
                  (this.dna = r),
                  (this.context = r.context),
                  (this.mcid = r.mcid),
                  (this.id = i.id || rt()),
                  (this.modelId = i.modelId),
                  (this.gotContext = !1),
                  (this.plugin_channel_class = lt),
                  (this.mc_plugin_npm_name = "motor-cortex-js"),
                  Object.prototype.hasOwnProperty.call(
                    i,
                    "plugin_channel_class"
                  ) && (this.plugin_channel_class = i.plugin_channel_class),
                  Object.prototype.hasOwnProperty.call(
                    i,
                    "mc_plugin_npm_name"
                  ) && (this.mc_plugin_npm_name = i.mc_plugin_npm_name),
                  (this.hasIncidents = !1),
                  (this.initialValues = {}),
                  (this.userDefinedInitialValues = n.initialValues || {}),
                  (this.pureInitialValues = null),
                  (this.autoGenerated = !1),
                  this.onInitialise();
              },
              d: [
                {
                  kind: "get",
                  key: "selector",
                  value: function () {
                    return this.props.selector;
                  },
                },
                {
                  kind: "get",
                  key: "animAttributes",
                  value: function () {
                    return this.attrs.animatedAttrs;
                  },
                },
                {
                  kind: "set",
                  key: "animAttributes",
                  value: function (t) {
                    this.attrs.animatedAttrs[this.attributeKey] = t;
                  },
                },
                {
                  kind: "method",
                  key: "getScratchValue",
                  value: function () {
                    return 0;
                  },
                },
                {
                  kind: "get",
                  key: "element",
                  value: function () {
                    return null === this.context
                      ? []
                      : this.context.getElementByMCID
                      ? this.context.getElementByMCID(this.mcid)
                      : this.context.getElements(this.selector)[0];
                  },
                },
                {
                  kind: "get",
                  key: "attributeKey",
                  value: function () {
                    return Object.keys(this.attrs.animatedAttrs)[0];
                  },
                },
                {
                  kind: "get",
                  key: "targetValue",
                  value: function () {
                    return this.animAttributes[this.attributeKey];
                  },
                },
                {
                  kind: "method",
                  key: "getElementAttribute",
                  value: function (t) {
                    return this.element.getAttribute(t);
                  },
                },
                {
                  kind: "method",
                  decorators: [Tt],
                  key: "getIncidentsByChannel",
                  value: function () {},
                },
                {
                  kind: "method",
                  key: "hasUserDefinedInitialValue",
                  value: function () {
                    return Object.prototype.hasOwnProperty.call(
                      this.userDefinedInitialValues,
                      this.attributeKey
                    );
                  },
                },
                {
                  kind: "method",
                  key: "setInitialValue",
                  value: function (t) {
                    var e =
                      !(arguments.length > 1 && void 0 !== arguments[1]) ||
                      arguments[1];
                    if (
                      (e &&
                        (this.pureInitialValues = JSON.parse(
                          JSON.stringify(t)
                        )),
                      this.hasUserDefinedInitialValue())
                    )
                      if (H(this.targetValue)) {
                        for (var n in this.userDefinedInitialValues[
                          this.attributeKey
                        ])
                          t[n] = this.userDefinedInitialValues[
                            this.attributeKey
                          ][n];
                        this.initialValues[this.attributeKey] = t;
                      } else
                        this.initialValues[
                          this.attributeKey
                        ] = this.userDefinedInitialValues[this.attributeKey];
                    else this.initialValues[this.attributeKey] = t;
                  },
                },
                {
                  kind: "get",
                  key: "initialValue",
                  value: function () {
                    return this.initialValues[this.attributeKey];
                  },
                },
                {
                  kind: "method",
                  key: "_onGetContextOnce",
                  value: function () {
                    try {
                      if (!0 === this.context.fragment) return;
                      this.gotContext ||
                        (this.onGetContext(), (this.gotContext = !0));
                    } catch (t) {
                      ot.error(t), ot.error(this.mcid);
                    }
                  },
                },
                {
                  kind: "method",
                  key: "onGetContext",
                  value: function () {
                    ot.info(
                      'Overwritte the "onGetContext" method with the code you want to get executed',
                      "info"
                    );
                  },
                },
                { kind: "method", key: "lastWish", value: function () {} },
                {
                  kind: "method",
                  key: "onInitialise",
                  value: function () {
                    ot.info(
                      'Overwritte the "onInialise" method with the code you want to get executed',
                      "info"
                    );
                  },
                },
                {
                  kind: "method",
                  key: "onProgress",
                  value: function (t, e) {},
                },
                {
                  kind: "method",
                  decorators: [gt],
                  key: "setBlock",
                  value: function () {},
                },
                {
                  kind: "method",
                  decorators: [bt],
                  key: "unblock",
                  value: function () {},
                },
              ],
            };
          }),
          Mt = (function (t) {
            d(n, t);
            var e = g(n);
            function n(t, i, r) {
              var s;
              return (
                o(this, n),
                ((s = e.call(this, t, i, r)).runTimeInfo = {
                  currentMillisecond: 0,
                }),
                s
              );
            }
            return (
              l(n, [
                {
                  key: "duration",
                  get: function () {
                    return this.DescriptiveIncident.realClip.duration;
                  },
                },
                {
                  key: "lastWish",
                  value: function () {
                    this.ownClip && this.ownClip.context.unmount();
                  },
                },
                {
                  key: "onGetContext",
                  value: function () {
                    var t = this,
                      e = this.DescriptiveIncident.realClip.exportConstructionArguments(),
                      n = ot.getElementByMCID(this.context, this.mcid),
                      i = p(
                        p({}, e.props),
                        {},
                        {
                          selector: void 0,
                          host: n,
                          containerParams:
                            this.DescriptiveIncident.props.containerParams ||
                            {},
                          originalDims:
                            this.DescriptiveIncident.constructor.originalDims ||
                            {},
                        }
                      );
                    (this.ownClip = new this.DescriptiveIncident.constructor.Incident(
                      e.attrs,
                      i
                    )),
                      (this.ownClip.DescriptiveIncident = this.DescriptiveIncident),
                      this.DescriptiveIncident.realClip.addContext(
                        {
                          clipId: this.id,
                          context: this.ownClip.context,
                          unblock: function () {
                            return t.unblock();
                          },
                        },
                        !0
                      );
                  },
                },
                {
                  key: "onProgress",
                  value: function (t, e) {
                    var n =
                      arguments.length > 2 &&
                      void 0 !== arguments[2] &&
                      arguments[2];
                    if (
                      !1 !==
                      this.DescriptiveIncident.realClip.context.contextLoaded
                    ) {
                      for (var i in this.DescriptiveIncident.realClip
                        .instantiatedChannels) {
                        var r = this.DescriptiveIncident.realClip
                          .instantiatedChannels[i];
                        r.moveTo(
                          this.runTimeInfo.currentMillisecond,
                          e,
                          this.id,
                          n
                        );
                      }
                      (this.runTimeInfo.currentMillisecond = e),
                        this.ownClip.onAfterProgress(t, e);
                    } else this.setBlock();
                  },
                },
              ]),
              n
            );
          })(St);
        function jt(t) {
          var e = new t.Incident(
            t.attrs,
            p(p({}, t.props), {}, { id: t.id || rt() }),
            { context: t.context, mcid: t.mcid }
          );
          return (
            (e.mc_plugin_npm_name = t.plugin_npm_name),
            (e.plugin_channel_class = t.Channel),
            (e.DescriptiveIncident = t.DescriptiveIncident),
            e
          );
        }
        var Vt = {
            linear: function (t) {
              return t;
            },
            easeInQuad: function (t) {
              return t * t;
            },
            easeOutQuad: function (t) {
              return t * (2 - t);
            },
            easeInOutQuad: function (t) {
              return t < 0.5 ? 2 * t * t : (4 - 2 * t) * t - 1;
            },
            easeInCubic: function (t) {
              return t * t * t;
            },
            easeOutCubic: function (t) {
              return --t * t * t + 1;
            },
            easeInOutCubic: function (t) {
              return t < 0.5
                ? 4 * t * t * t
                : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
            },
            easeInQuart: function (t) {
              return t * t * t * t;
            },
            easeOutQuart: function (t) {
              return 1 - --t * t * t * t;
            },
            easeInOutQuart: function (t) {
              return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
            },
            easeInQuint: function (t) {
              return t * t * t * t * t;
            },
            easeOutQuint: function (t) {
              return 1 + --t * t * t * t * t;
            },
            easeInOutQuint: function (t) {
              return t < 0.5
                ? 16 * t * t * t * t * t
                : 1 + 16 * --t * t * t * t * t;
            },
            easeInSine: function (t) {
              return -1 * Math.cos(t * (Math.PI / 2)) + 1;
            },
            easeOutSine: function (t) {
              return Math.sin(t * (Math.PI / 2));
            },
            easeInOutSine: function (t) {
              return -0.5 * (Math.cos(Math.PI * t) - 1);
            },
            easeInExpo: function (t) {
              return 0 == t ? 1 : 1 * Math.pow(2, 10 * (t - 1));
            },
            easeOutExpo: function (t) {
              return 1 == t ? 1 : 1 * (1 - Math.pow(2, -10 * t));
            },
            easeInOutExpo: function (t) {
              return 0 == t || 1 == t
                ? t
                : (t /= 0.5) < 1
                ? 0.5 * Math.pow(2, 10 * (t - 1))
                : 0.5 * (2 - Math.pow(2, -10 * --t));
            },
            easeInCirc: function (t) {
              return t >= 1 ? t : -(Math.sqrt(1 - (t /= 1) * t) - 1);
            },
            easeOutCirc: function (t) {
              return Math.sqrt(1 - (t = t / 1 - 1) * t);
            },
            easeInOutCirc: function (t) {
              return (t /= 0.5) < 1
                ? -0.5 * (Math.sqrt(1 - t * t) - 1)
                : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
            },
            easeInElastic: function (t) {
              if (0 == t || 1 == t) return t;
              var e = (0.3 / (2 * Math.PI)) * Math.asin(1);
              return (
                -Math.pow(2, 10 * (t -= 1)) *
                Math.sin(((1 * t - e) * (2 * Math.PI)) / 0.3)
              );
            },
            easeOutElastic: function (t) {
              if (0 == t || 1 == t) return t;
              var e = (0.3 / (2 * Math.PI)) * Math.asin(1);
              return (
                Math.pow(2, -10 * t) *
                  Math.sin(((t - e) * (2 * Math.PI)) / 0.3) +
                1
              );
            },
            easeInOutElastic: function (t) {
              if (0 == t || 1 == t) return t;
              var e = 0.3 * 1.5,
                n = (e / (2 * Math.PI)) * Math.asin(1);
              return t < 1
                ? Math.pow(2, 10 * (t -= 1)) *
                    Math.sin(((t - n) * (2 * Math.PI)) / e) *
                    -0.5
                : Math.pow(2, -10 * (t -= 1)) *
                    Math.sin(((t - n) * (2 * Math.PI)) / e) *
                    0.5 +
                    1;
            },
            easeInBack: function (t) {
              var e = 1.70158;
              return t * t * ((e + 1) * t - e);
            },
            easeOutBack: function (t) {
              var e = 1.70158;
              return (t -= -1) * t * ((e + 1) * t + e) + 1;
            },
            easeInOutBack: function (t) {
              var e = 1.70158;
              return (t /= 0.5) < 1
                ? t * t * ((1 + (e *= 1.525)) * t - e) * 0.5
                : 0.5 * ((t -= 2) * t * ((1 + (e *= 1.525)) * t + e) + 2);
            },
            easeInBounce: function (t) {
              return 1 - Vt.easeOutBounce(1 - t);
            },
            easeOutBounce: function (t) {
              return t < 1 / 2.75
                ? 7.5625 * t * t * 1
                : t < 2 / 2.75
                ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
                : t < 2.5 / 2.75
                ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
                : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
            },
            easeInOutBounce: function (t) {
              return t < 0.5
                ? 0.5 * Vt.easeInBounce(2 * t)
                : 0.5 * (Vt.easeOutBounce(2 * t - 1) + 1);
            },
          },
          Nt = T(
            null,
            function (t, e) {
              return {
                F: (function (e) {
                  d(i, e);
                  var n = g(i);
                  function i(e, r, s, a) {
                    var u;
                    return (
                      o(this, i),
                      (u = n.call(
                        this,
                        p(
                          p({}, e.props),
                          {},
                          { id: "".concat(e.incidentId, "_").concat(s) }
                        )
                      )),
                      t(v(u)),
                      (u.contexts = {}),
                      (u.constructionIngredients = e),
                      (u.mcid = s),
                      (u.DescriptiveIncident = a),
                      (u.mc_plugin_npm_name = e.plugin_npm_name),
                      (u.plugin_channel_class = e.Channel),
                      u.addContext(r),
                      (u.timeScale = 1),
                      a.realClip.duration > 0 &&
                        (u.timeScale = u.props.duration / a.realClip.duration),
                      a.realClip.subscribeToDurationChange(function (t) {
                        (u.props.duration = u.timeScale * t),
                          u.putMessageOnPipe("recalcDuration", {}, "Groups", {
                            selfExecute: !1,
                            direction: ct,
                          });
                      }),
                      (u.easing = Vt.linear),
                      Object.prototype.hasOwnProperty.call(u.props, "easing") &&
                        (Array.isArray(u.props.easing)
                          ? (u.easing = Dt(
                              u.props.easing[0],
                              u.props.easing[1],
                              u.props.easing[2],
                              u.props.easing[3]
                            ))
                          : (u.easing = Vt[u.props.easing])),
                      u
                    );
                  }
                  return i;
                })(e),
                d: [
                  {
                    kind: "get",
                    key: "originalContext",
                    value: function () {
                      return this.contexts[this.originalContextKey];
                    },
                  },
                  {
                    kind: "method",
                    key: "onProgress",
                    value: function (t, e, n) {
                      var i =
                          arguments.length > 3 &&
                          void 0 !== arguments[3] &&
                          arguments[3],
                        r = this.delay + this.props.duration + this.hiatus,
                        s = e % r;
                      0 !== e &&
                        0 === s &&
                        (s = this.delay + this.props.duration);
                      var a = s - this.delay;
                      a < 0
                        ? (a = 0)
                        : a > this.props.duration && (a = this.props.duration);
                      var o =
                          0 === this.props.duration
                            ? 0
                            : a / this.props.duration,
                        u = this.easing(o),
                        l = u * this.props.duration * (1 / this.timeScale);
                      !1 !== this.originalContext.context.contextLoaded &&
                        this.contexts[n].onProgress(u, l, i);
                    },
                  },
                  {
                    kind: "method",
                    key: "addContext",
                    value: function (t) {
                      var e =
                        arguments.length > 1 &&
                        void 0 !== arguments[1] &&
                        arguments[1];
                      0 === Object.keys(this.contexts).length &&
                        (this.originalContextKey = t.clipId);
                      var n = p(
                        p({}, this.constructionIngredients),
                        {},
                        {
                          context: t.context,
                          mcid: this.mcid,
                          Incident: Mt,
                          DescriptiveIncident: this.DescriptiveIncident,
                        }
                      );
                      (this.contexts[t.clipId] = jt(n)),
                        e && this.contexts[t.clipId]._onGetContextOnce();
                    },
                  },
                  {
                    kind: "method",
                    key: "handleAddContext",
                    value: function (t, e) {
                      return this.addContext(e, !0), !0;
                    },
                  },
                  {
                    kind: "method",
                    key: "handleContextLoaded",
                    value: function (t, e) {
                      this._onGetContextOnce();
                    },
                  },
                  {
                    kind: "method",
                    decorators: [Tt],
                    key: "getIncidentsByChannel",
                    value: function () {},
                  },
                  {
                    kind: "method",
                    key: "gotContext",
                    value: function () {
                      for (var t in this.contexts)
                        this.contexts[t].gotContext();
                    },
                  },
                  {
                    kind: "method",
                    key: "_onGetContextOnce",
                    value: function () {
                      if (!1 !== this.originalContext.contextLoaded)
                        for (var t in this.contexts)
                          this.contexts[t]._onGetContextOnce();
                    },
                  },
                  {
                    kind: "method",
                    key: "lastWish",
                    value: function () {
                      for (var t in this.contexts) this.contexts[t].lastWish();
                    },
                  },
                  {
                    kind: "method",
                    key: "onGetContext",
                    value: function () {
                      if (!1 !== this.originalContext.contextLoaded)
                        for (var t in this.contexts)
                          this.contexts[t].onGetContext();
                    },
                  },
                ],
              };
            },
            dt
          ),
          $t = T(
            null,
            function (t, e) {
              var n = (function (e) {
                d(i, e);
                var n = g(i);
                function i(e, r, s, a) {
                  var u;
                  if (
                    (o(this, i),
                    (u = n.call(
                      this,
                      p(
                        p({}, e.props),
                        {},
                        {
                          id:
                            null !== a
                              ? ""
                                  .concat(e.incidentId, "_")
                                  .concat(s, "_")
                                  .concat(a)
                              : "".concat(e.incidentId, "_").concat(s),
                        }
                      )
                    )),
                    t(v(u)),
                    (u.contexts = {}),
                    (u.constructionIngredients = e),
                    (u.mcid = s),
                    (u.attribute = a),
                    (u.mc_plugin_npm_name = e.plugin_npm_name),
                    (u.plugin_channel_class = e.Channel),
                    (u.DescriptiveIncident = e.DescriptiveIncident),
                    u.addContext(r),
                    null !== a)
                  ) {
                    var l =
                      u.constructionIngredients.attrs.animatedAttrs[
                        u.attribute
                      ];
                    Array.isArray(l)
                      ? (u.originalAnimatedAttributeValue = O(l))
                      : H(l)
                      ? (u.originalAnimatedAttributeValue = p({}, l))
                      : (u.originalAnimatedAttributeValue = l);
                  }
                  return (
                    (u.easing = Vt.linear),
                    Object.prototype.hasOwnProperty.call(u.props, "easing") &&
                      (Array.isArray(u.props.easing)
                        ? (u.easing = Dt(
                            u.props.easing[0],
                            u.props.easing[1],
                            u.props.easing[2],
                            u.props.easing[3]
                          ))
                        : (u.easing = Vt[u.props.easing])),
                    u
                  );
                }
                return i;
              })(e);
              return {
                F: n,
                d: [
                  {
                    kind: "get",
                    key: "originalContext",
                    value: function () {
                      return this.contexts[this.originalContextKey];
                    },
                  },
                  {
                    kind: "get",
                    key: "duration",
                    value: function () {
                      return k(f(n.prototype), "duration", this);
                    },
                  },
                  {
                    kind: "set",
                    key: "duration",
                    value: function (t) {
                      for (var e in (w(f(n.prototype), "duration", t, this, !0),
                      this.contexts))
                        this.contexts[e].duration = t;
                    },
                  },
                  {
                    kind: "method",
                    key: "addContext",
                    value: function (t) {
                      var e =
                          arguments.length > 1 &&
                          void 0 !== arguments[1] &&
                          arguments[1],
                        n = !1;
                      0 === Object.keys(this.contexts).length &&
                        ((this.originalContextKey = t.clipId),
                        (this.originalClipContext = t.context),
                        (n = !0));
                      var i = p(
                          p({}, this.constructionIngredients),
                          {},
                          { context: t.context, mcid: this.mcid }
                        ),
                        r = jt(i);
                      (this.contexts[t.clipId] = r),
                        n ||
                          null == this.attribute ||
                          this.contexts[t.clipId].setInitialValue(
                            this.initialValue
                          ),
                        e &&
                          this.contexts[t.clipId].context.contextLoaded &&
                          this.contexts[t.clipId]._onGetContextOnce();
                    },
                  },
                  {
                    kind: "method",
                    key: "handleAddContext",
                    value: function (t, e) {
                      return this.addContext(e, !0), !0;
                    },
                  },
                  {
                    kind: "method",
                    key: "handleContextLoaded",
                    value: function (t, e) {
                      return this._onGetContextOnce(), !0;
                    },
                  },
                  {
                    kind: "method",
                    decorators: [Tt],
                    key: "getIncidentsByChannel",
                    value: function () {},
                  },
                  {
                    kind: "method",
                    key: "onProgress",
                    value: function (t, e, n) {
                      var i =
                        e % (this.delay + this.props.duration + this.hiatus);
                      0 !== e &&
                        0 === i &&
                        (i = this.delay + this.props.duration);
                      var r = i - this.delay;
                      r < 0
                        ? (r = 0)
                        : r > this.props.duration && (r = this.props.duration);
                      var s = r / this.props.duration,
                        a = this.easing(s),
                        o = a * this.props.duration;
                      if (null != n)
                        !1 !== this.originalContext.context.contextLoaded &&
                          this.contexts[n].onProgress(a, o);
                      else
                        for (var u in this.contexts)
                          (this.originalContextKey === u &&
                            !0 === this.originalContext.fragment) ||
                            this.contexts[u].onProgress(a, o);
                    },
                  },
                  {
                    kind: "get",
                    key: "animatedAttributeValue",
                    value: function () {
                      return this.constructionIngredients.attrs.animatedAttrs[
                        this.attribute
                      ];
                    },
                  },
                  {
                    kind: "set",
                    key: "animatedAttributeValue",
                    value: function (t) {
                      this.constructionIngredients.attrs.animatedAttrs[
                        this.attribute
                      ] = t;
                    },
                  },
                  {
                    kind: "method",
                    key: "gotContext",
                    value: function () {
                      for (var t in this.contexts)
                        this.contexts[t].gotContext();
                    },
                  },
                  {
                    kind: "method",
                    key: "_onGetContextOnce",
                    value: function () {
                      if (!1 !== this.originalContext.context.contextLoaded)
                        for (var t in this.contexts)
                          this.contexts[t]._onGetContextOnce();
                    },
                  },
                  {
                    kind: "method",
                    key: "lastWish",
                    value: function () {
                      for (var t in this.contexts) this.contexts[t].lastWish();
                    },
                  },
                  {
                    kind: "method",
                    key: "onGetContext",
                    value: function () {
                      if (!1 !== this.originalContext.contextLoaded)
                        for (var t in this.contexts)
                          this.contexts[t].context.contextLoaded &&
                            this.contexts[t].onGetContext();
                    },
                  },
                  {
                    kind: "get",
                    key: "initialValue",
                    value: function () {
                      return this.originalContext.initialValue;
                    },
                  },
                  {
                    kind: "get",
                    key: "scratchValue",
                    value: function () {
                      return this.originalContext.scratchValue;
                    },
                  },
                  {
                    kind: "get",
                    key: "pureInitialValues",
                    value: function () {
                      return this.originalContext.pureInitialValues;
                    },
                  },
                  {
                    kind: "method",
                    key: "setInitialValue",
                    value: function () {
                      var t =
                          arguments.length > 0 && void 0 !== arguments[0]
                            ? arguments[0]
                            : null,
                        e =
                          !(arguments.length > 1 && void 0 !== arguments[1]) ||
                          arguments[1];
                      for (var n in (null === t && (t = this.getScratchValue()),
                      this.contexts))
                        this.contexts[n].setInitialValue(
                          JSON.parse(JSON.stringify(t)),
                          e
                        );
                    },
                  },
                  {
                    kind: "method",
                    key: "getScratchValue",
                    value: function () {
                      var t =
                        arguments.length > 0 && void 0 !== arguments[0]
                          ? arguments[0]
                          : null;
                      if (!this.originalContext.context.contextLoaded) return 0;
                      if (null != t) return this.contexts[t].getScratchValue();
                      var e = Object.keys(this.contexts);
                      if (
                        Object.prototype.hasOwnProperty.call(
                          this.originalClipContext,
                          "nonFragmentedContext"
                        )
                      ) {
                        var n = p(
                            p({}, this.constructionIngredients),
                            {},
                            {
                              context: this.originalClipContext
                                .nonFragmentedContext,
                              mcid: this.mcid,
                            }
                          ),
                          i = jt(n);
                        return i.getScratchValue();
                      }
                      return 1 === e.length
                        ? this.originalContext.getScratchValue()
                        : this.contexts[e[1]].getScratchValue();
                    },
                  },
                  {
                    kind: "method",
                    key: "setCompoAttrKeyValue",
                    value: function (t, e) {
                      for (var n in this.contexts)
                        (this.contexts[n].attrs.animatedAttrs[this.attribute][
                          t
                        ] = e),
                          this.contexts[n].lastWish(),
                          this.contexts[n].onGetContext();
                    },
                  },
                  {
                    kind: "method",
                    key: "play",
                    value: function (t, e, n) {
                      return this.contexts[n].play(e);
                    },
                  },
                  {
                    kind: "method",
                    key: "stop",
                    value: function (t) {
                      this.contexts[t].stop();
                    },
                  },
                ],
              };
            },
            dt
          ),
          Bt = (function (t) {
            d(n, t);
            var e = g(n);
            function n(t, i, r, s, a) {
              var u;
              return (
                o(this, n),
                ((u = e.call(
                  this,
                  {},
                  { id: "".concat(t.id, "_").concat(r) }
                )).mcid = r),
                (u.selector = s),
                (u.data = a),
                u.setUp(t, i),
                u
              );
            }
            return (
              l(n, [
                {
                  key: "setUp",
                  value: function (t, e) {
                    for (var n in this.data.attrs.animatedAttrs) {
                      var i = {};
                      i[n] = this.data.attrs.animatedAttrs[n];
                      var r = p(
                          p({}, this.data.attrs),
                          {},
                          { animatedAttrs: i }
                        ),
                        s = p(
                          p({}, this.data.props),
                          {},
                          { selector: this.selector }
                        ),
                        a = {
                          incidentId: t.id,
                          attrs: r,
                          props: s,
                          Incident: t.constructor.Incident,
                          plugin_npm_name: t.constructor.plugin_npm_name,
                          Channel: t.constructor.Channel,
                          DescriptiveIncident: t,
                        },
                        o = new $t(a, e, this.mcid, n);
                      this.addChild(o, 0);
                    }
                  },
                },
              ]),
              n
            );
          })(kt);
        var Lt = (function (t) {
            d(n, t);
            var e = g(n);
            function n(t, i) {
              var r;
              return (
                o(this, n),
                ((r = e.call(this, {}, { id: t.id })).contexts = {}),
                (r.contexts[i.clipId] = i.context),
                (r.originalContextKey = i.clipId),
                (r.initParams = i.context.initParams),
                (r.instantiatedCopiesContexts = i.instantiatedCopiesContexts),
                (r.descriptiveIncident = t),
                (r.staggerAttrs = []),
                (r.staggerProps = []),
                r.setUp(t, i),
                r
              );
            }
            return (
              l(n, [
                {
                  key: "originalContext",
                  get: function () {
                    return this.contexts[this.originalContextKey];
                  },
                },
                {
                  key: "parsePropsDynamicValues",
                  value: function (t, e) {
                    for (var n = 0; n < t.propsStaggers.length; n++)
                      this.staggerProps.push({
                        path: t.propsStaggers[n].path,
                        values: t.propsStaggers[n].stagger.calculateValues(
                          e,
                          this.initParams
                        ),
                      });
                  },
                },
                {
                  key: "parseAttrsDynamicValues",
                  value: function (t, e) {
                    for (var n = 0; n < t.attributesStaggers.length; n++)
                      this.staggerAttrs.push({
                        path: t.attributesStaggers[n].path,
                        values: t.attributesStaggers[n].stagger.calculateValues(
                          e,
                          this.initParams
                        ),
                      });
                  },
                },
                {
                  key: "setUp",
                  value: function (t, e) {
                    var n,
                      i,
                      r = this.originalContext.getElements(t.selector());
                    this.parsePropsDynamicValues(t, r),
                      this.parseAttrsDynamicValues(t, r);
                    for (var s = 0; s < r.length; s++) {
                      for (var a in ((n = r[s]),
                      (i = this._getElementMCID(n)),
                      this.instantiatedCopiesContexts))
                        this._setElementMCID(
                          this.instantiatedCopiesContexts[a],
                          this.instantiatedCopiesContexts[a].getElements(
                            t.selector()
                          )[s],
                          i
                        );
                      this._createElementIncident(n, t, e, s, r.length, i);
                    }
                  },
                },
                {
                  key: "handleRecalcDuration",
                  value: function (t, e) {
                    var i = k(
                      f(n.prototype),
                      "handleRecalcDuration",
                      this
                    ).call(this, t, e);
                    return (
                      this.descriptiveIncident.propsStaggers.length > 0 &&
                        (this.descriptiveIncident.dynamicDurationValue =
                          1 * this.duration),
                      i
                    );
                  },
                },
                {
                  key: "lastWish",
                  value: function () {
                    this.descriptiveIncident.propsStaggers.length > 0 &&
                      ((this.descriptiveIncident.dynamicDurationValue = null),
                      this.descriptiveIncident.putMessageOnPipe(
                        "setDurationDynamic",
                        {},
                        "Groups",
                        { selfExecute: !1, direction: ct }
                      )),
                      k(f(n.prototype), "lastWish", this).call(this);
                  },
                },
                {
                  key: "_getElementMCID",
                  value: function (t) {
                    var e = this.originalContext.getMCID(t);
                    return (
                      e || ((e = rt(!0)), this.originalContext.setMCID(t, e)), e
                    );
                  },
                },
                {
                  key: "_setElementMCID",
                  value: function (t, e, n) {
                    t.getMCID(e) || t.setMCID(e, n);
                  },
                },
                {
                  key: "_prepareAttrsPropsForElement",
                  value: function (t, e) {
                    var n = (function (t, e) {
                        for (var n = [], i = 0; i < t.length; i++)
                          n.push({ path: t[i].path, value: t[i].values[e] });
                        return n;
                      })(this.staggerAttrs, e),
                      i = (function (t, e) {
                        for (var n = [], i = 0; i < t.length; i++)
                          n.push({ path: t[i].path, value: t[i].values[e] });
                        return n;
                      })(this.staggerProps, e),
                      r = t.attrs,
                      s = t.props;
                    if (n.length > 0) {
                      r = JSON.parse(JSON.stringify(t.attrs));
                      for (var a = 0; a < n.length; a++)
                        at(r, n[a].path, n[a].value);
                    }
                    if (i.length > 0) {
                      s = JSON.parse(JSON.stringify(t.props));
                      for (var o = 0; o < i.length; o++)
                        at(s, i[o].path, i[o].value);
                    }
                    return { attrs: r, props: s };
                  },
                },
                {
                  key: "_createElementIncident",
                  value: function (t, e, n, i, r, s) {
                    var a = this._prepareAttrsPropsForElement(e, i);
                    if (
                      Object.prototype.hasOwnProperty.call(
                        e.attrs,
                        "animatedAttrs"
                      )
                    ) {
                      var o = new Bt(
                        e,
                        n,
                        s,
                        n.context.getElementSelectorByMCID(s),
                        a
                      );
                      this.addChild(o, 0);
                    } else {
                      var u = a.attrs,
                        l = a.props,
                        c = {
                          incidentId: e.id,
                          attrs: u,
                          props: l,
                          Incident: e.constructor.Incident,
                          plugin_npm_name: e.constructor.plugin_npm_name,
                          Channel: e.constructor.Channel,
                          DescriptiveIncident: e,
                        },
                        h = new $t(c, n, s, null);
                      this.addChild(h, 0);
                    }
                  },
                },
              ]),
              n
            );
          })(kt),
          Ft = (function (t) {
            d(n, t);
            var e = g(n);
            function n(t, i) {
              var r;
              return (
                o(this, n), ((r = e.call(this, t, i)).realClip = t.realClip), r
              );
            }
            return (
              l(n, [
                {
                  key: "_createElementIncident",
                  value: function (t, e, n, i, r, s) {
                    var a = e.realClip.exportConstructionArguments(),
                      o = this._prepareAttrsPropsForElement(e, i),
                      u = p(
                        p(
                          p(
                            p({}, e.props),
                            {},
                            { duration: e.realClip.duration },
                            a.props
                          ),
                          o.props
                        ),
                        {},
                        {
                          selector: n.context.getElementSelectorByMCID(s),
                          runTimeInfo: e.runTimeInfo,
                        }
                      ),
                      l = {
                        incidentId: e.id,
                        attrs: a.attrs,
                        props: u,
                        Incident: e.constructor.Incident,
                        plugin_npm_name: e.constructor.plugin_npm_name,
                        Channel: xt,
                        DescriptiveIncident: e,
                      },
                      c = new Nt(l, n, s, e);
                    this.addChild(c, 0);
                  },
                },
              ]),
              n
            );
          })(Lt),
          Rt = function (t, e) {
            var n =
                arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
              i =
                arguments.length > 3 && void 0 !== arguments[3]
                  ? arguments[3]
                  : R,
              r =
                arguments.length > 4 && void 0 !== arguments[4]
                  ? arguments[4]
                  : window;
            Object.prototype.hasOwnProperty.call(r, i) || (r[i] = {});
            for (var s = r[i], a = t.split("."), o = 0; o < a.length - 1; o++)
              Object.prototype.hasOwnProperty.call(s, a[o]) || (s[a[o]] = {}),
                (s = s[a[o]]);
            return (
              (!Object.prototype.hasOwnProperty.call(s, a[a.length - 1]) ||
                !1 !== n) &&
              ((s[a[a.length - 1]] = e), !0)
            );
          };
        function zt(t) {
          var e = {},
            n = [],
            i = Array.isArray(t),
            r = i ? t.length : 0,
            s = null;
          return new Proxy(t, {
            keywords: [
              "setValue",
              "_getFromProxy",
              "__createPathProxies",
              "hasOwnProperty",
              "pushValue",
              "removePathKey",
              "removeKey",
              "restoreKey",
              "getKeys",
              "exportFlattened",
              "isArray",
              "push",
              "sortBy",
              "findIndex",
            ],
            get: function (a, o) {
              return "length" === o && i
                ? r
                : this.keywords.indexOf(o) >= 0
                ? this[o]
                : n.indexOf(o) >= 0
                ? void 0
                : (i && null !== s && (o = s[o]),
                  Object.prototype.hasOwnProperty.call(e, o) ? e[o] : t[o]);
            },
            isArray: function () {
              return i;
            },
            _getFromProxy: function (t) {
              return Object.prototype.hasOwnProperty.call(e, t) ? e[t] : void 0;
            },
            set: function () {
              return !1;
            },
            sortBy: function (t) {
              if (((s = null), !i)) return !1;
              s = (function (t, e) {
                for (var n = [], i = 0; i < t.length; i++) n.push([t[i], i]);
                n.sort(function (t, n) {
                  return t[0][e] < n[0][e] ? -1 : 1;
                });
                var r = [];
                for (var s in n) r.push(n[s][1]);
                return r;
              })(this, t);
            },
            __createPathProxies: function (n) {
              for (var r = e, a = t, o = 0; o < n.length - 1; o++) {
                var u = i && null !== s ? s[n[o]] : n[o];
                if (0 === o ? void 0 === r[u] : void 0 === r._getFromProxy(u)) {
                  var l = zt((void 0 !== a && a[u]) || {});
                  0 === o ? (r[u] = l) : r.setValue(u, l);
                }
                (r = r[u]), (a = void 0 !== a ? a[u] : {});
              }
              return { currentObject: r, currentRealObect: a };
            },
            findIndex: function (t) {
              if (!i) return null;
              for (var e = 0; e < r; e++) if (t(this[e])) return e;
              return null;
            },
            setValue: function (t, e) {
              var i = t.split("."),
                r = this.__createPathProxies(i).currentObject,
                s = e;
              if (("object" === a(e) && (s = zt(e)), 1 === i.length)) {
                r[i[i.length - 1]] = s;
                var o = n.indexOf(i[i.length - 1]);
                o > -1 && n.splice(o, 1);
              } else
                r.setValue(i[i.length - 1], s), r.restoreKey(i[i.length - 1]);
              return !0;
            },
            pushValue: function (e, n) {
              var i = e.split("."),
                r = this.__createPathProxies(i),
                s = r.currentObject;
              if (void 0 === r.currentRealObect) return !1;
              var a = i[i.length - 1],
                o = s[a],
                u = t[a];
              if (("" === e && ((o = this), (u = t)), 1 !== i.length))
                return s.pushValue(a, n);
              var l = !1;
              if (void 0 !== o) {
                if (((l = !0), !o.isArray())) return !1;
              } else if (!Array.isArray(u)) return !1;
              if (!l) {
                var c = zt(u);
                (s[a] = c), (o = s[a]);
              }
              return o.push(n), !0;
            },
            push: function (t) {
              return (
                !!this.isArray() &&
                ("object" === a(t) ? (e[r] = zt(t)) : (e[r] = t), (r += 1), !0)
              );
            },
            removePathKey: function (t) {
              var e = t.split(".");
              return (
                this.__createPathProxies(e).currentObject.removeKey(
                  e[e.length - 1]
                ),
                !0
              );
            },
            removeKey: function (t) {
              n.push(t);
            },
            restoreKey: function (t) {
              var e = n.indexOf(t);
              e > -1 && n.splice(e, 1);
            },
            hasOwnProperty: function (t) {
              return !(n.indexOf(t) > -1) && void 0 !== this[t];
            },
            getKeys: function () {
              if (i) return [];
              for (
                var r = [],
                  s = Object.keys(t),
                  a = Object.keys(e),
                  o = [].concat(O(s), O(a)),
                  u = o.filter(function (t, e) {
                    return o.indexOf(t) === e;
                  }),
                  l = 0;
                l < u.length;
                l++
              ) {
                n.indexOf(u[l]) < 0 && r.push(u[l]);
              }
              return r;
            },
            exportFlattened: function () {
              var n;
              if (i)
                if (((n = []), null !== s))
                  for (var r = 0; r < s.length; r++) {
                    var o = s[r];
                    if (Object.prototype.hasOwnProperty.call(e, o)) {
                      var u = e[o];
                      if ("object" === a(u))
                        try {
                          n[r] = e[o].exportFlattened();
                        } catch (t) {
                          n[r] = u;
                        }
                      else n[r] = u;
                    } else n[r] = t[o];
                  }
                else {
                  n = O(t);
                  for (var l = 0, c = Object.entries(e); l < c.length; l++) {
                    var h = C(c[l], 2),
                      p = h[0],
                      d = h[1];
                    if ("object" === a(d))
                      try {
                        n[p] = e[p].exportFlattened();
                      } catch (t) {
                        n[p] = d;
                      }
                    else n[p] = d;
                  }
                }
              else {
                n = {};
                for (var f = this.getKeys(), m = 0; m < f.length; m++) {
                  var v = f[m];
                  void 0 !== e[v]
                    ? "object" === a(e[v])
                      ? (n[v] = e[v].exportFlattened())
                      : (n[v] = e[v])
                    : (n[v] = t[v]);
                }
              }
              return n;
            },
          });
        }
        var Gt = "6.4.1";
        var qt = function t(e, n, i = {}) {
            for (let s in n)
              if (
                "object" == typeof (r = n[s]) &&
                !Array.isArray(r) &&
                null != r &&
                Object.keys(r).length > 0
              )
                (e[s] = e[s] || {}), t(e[s], n[s], i);
              else {
                if (!0 === i.skipIfExist && void 0 !== e[s]) continue;
                e[s] = n[s];
              }
            var r;
            return e;
          },
          Kt = {
            required: "The '{field}' field is required.",
            string: "The '{field}' field must be a string.",
            stringEmpty: "The '{field}' field must not be empty.",
            stringMin:
              "The '{field}' field length must be greater than or equal to {expected} characters long.",
            stringMax:
              "The '{field}' field length must be less than or equal to {expected} characters long.",
            stringLength:
              "The '{field}' field length must be {expected} characters long.",
            stringPattern:
              "The '{field}' field fails to match the required pattern.",
            stringContains:
              "The '{field}' field must contain the '{expected}' text.",
            stringEnum:
              "The '{field}' field does not match any of the allowed values.",
            stringNumeric: "The '{field}' field must be a numeric string.",
            stringAlpha: "The '{field}' field must be an alphabetic string.",
            stringAlphanum:
              "The '{field}' field must be an alphanumeric string.",
            stringAlphadash: "The '{field}' field must be an alphadash string.",
            stringHex: "The '{field}' field must be a hex string.",
            stringSingleLine:
              "The '{field}' field must be a single line string.",
            stringBase64: "The '{field}' field must be a base64 string.",
            number: "The '{field}' field must be a number.",
            numberMin:
              "The '{field}' field must be greater than or equal to {expected}.",
            numberMax:
              "The '{field}' field must be less than or equal to {expected}.",
            numberEqual: "The '{field}' field must be equal to {expected}.",
            numberNotEqual: "The '{field}' field can't be equal to {expected}.",
            numberInteger: "The '{field}' field must be an integer.",
            numberPositive: "The '{field}' field must be a positive number.",
            numberNegative: "The '{field}' field must be a negative number.",
            array: "The '{field}' field must be an array.",
            arrayEmpty: "The '{field}' field must not be an empty array.",
            arrayMin:
              "The '{field}' field must contain at least {expected} items.",
            arrayMax:
              "The '{field}' field must contain less than or equal to {expected} items.",
            arrayLength: "The '{field}' field must contain {expected} items.",
            arrayContains:
              "The '{field}' field must contain the '{expected}' item.",
            arrayUnique:
              "The '{actual}' value in '{field}' field does not unique the '{expected}' values.",
            arrayEnum:
              "The '{actual}' value in '{field}' field does not match any of the '{expected}' values.",
            tuple: "The '{field}' field must be an array.",
            tupleEmpty: "The '{field}' field must not be an empty array.",
            tupleLength: "The '{field}' field must contain {expected} items.",
            boolean: "The '{field}' field must be a boolean.",
            currency: "The '{field}' must be a valid currency format",
            date: "The '{field}' field must be a Date.",
            dateMin:
              "The '{field}' field must be greater than or equal to {expected}.",
            dateMax:
              "The '{field}' field must be less than or equal to {expected}.",
            enumValue:
              "The '{field}' field value '{expected}' does not match any of the allowed values.",
            equalValue:
              "The '{field}' field value must be equal to '{expected}'.",
            equalField:
              "The '{field}' field value must be equal to '{expected}' field value.",
            forbidden: "The '{field}' field is forbidden.",
            function: "The '{field}' field must be a function.",
            email: "The '{field}' field must be a valid e-mail.",
            emailEmpty: "The '{field}' field must not be empty.",
            emailMin:
              "The '{field}' field length must be greater than or equal to {expected} characters long.",
            emailMax:
              "The '{field}' field length must be less than or equal to {expected} characters long.",
            luhn: "The '{field}' field must be a valid checksum luhn.",
            mac: "The '{field}' field must be a valid MAC address.",
            object: "The '{field}' must be an Object.",
            objectStrict:
              "The object '{field}' contains forbidden keys: '{actual}'.",
            objectMinProps:
              "The object '{field}' must contain at least {expected} properties.",
            objectMaxProps:
              "The object '{field}' must contain {expected} properties at most.",
            url: "The '{field}' field must be a valid URL.",
            urlEmpty: "The '{field}' field must not be empty.",
            uuid: "The '{field}' field must be a valid UUID.",
            uuidVersion:
              "The '{field}' field must be a valid UUID version provided.",
            classInstanceOf:
              "The '{field}' field must be an instance of the '{expected}' class.",
            objectID: "The '{field}' field must be an valid ObjectID",
          },
          Jt = function () {
            const t = [];
            return t.push("\n\t\treturn value;\n\t"), { source: t.join("\n") };
          },
          Wt = function ({ schema: t, messages: e }, n, i) {
            const r = [];
            if (
              (r.push(
                `\n\t\tif (!Array.isArray(value)) {\n\t\t\t${this.makeError({
                  type: "array",
                  actual: "value",
                  messages: e,
                })}\n\t\t\treturn value;\n\t\t}\n\n\t\tvar len = value.length;\n\t`
              ),
              !1 === t.empty &&
                r.push(
                  `\n\t\t\tif (len === 0) {\n\t\t\t\t${this.makeError({
                    type: "arrayEmpty",
                    actual: "value",
                    messages: e,
                  })}\n\t\t\t}\n\t\t`
                ),
              null != t.min &&
                r.push(
                  `\n\t\t\tif (len < ${t.min}) {\n\t\t\t\t${this.makeError({
                    type: "arrayMin",
                    expected: t.min,
                    actual: "len",
                    messages: e,
                  })}\n\t\t\t}\n\t\t`
                ),
              null != t.max &&
                r.push(
                  `\n\t\t\tif (len > ${t.max}) {\n\t\t\t\t${this.makeError({
                    type: "arrayMax",
                    expected: t.max,
                    actual: "len",
                    messages: e,
                  })}\n\t\t\t}\n\t\t`
                ),
              null != t.length &&
                r.push(
                  `\n\t\t\tif (len !== ${
                    t.length
                  }) {\n\t\t\t\t${this.makeError({
                    type: "arrayLength",
                    expected: t.length,
                    actual: "len",
                    messages: e,
                  })}\n\t\t\t}\n\t\t`
                ),
              null != t.contains &&
                r.push(
                  `\n\t\t\tif (value.indexOf(${JSON.stringify(
                    t.contains
                  )}) === -1) {\n\t\t\t\t${this.makeError({
                    type: "arrayContains",
                    expected: JSON.stringify(t.contains),
                    actual: "value",
                    messages: e,
                  })}\n\t\t\t}\n\t\t`
                ),
              !0 === t.unique &&
                r.push(
                  `\n\t\t\tif(len > (new Set(value)).size) {\n\t\t\t\t${this.makeError(
                    {
                      type: "arrayUnique",
                      expected:
                        "Array.from(new Set(value.filter((item, index) => value.indexOf(item) !== index)))",
                      actual: "value",
                      messages: e,
                    }
                  )}\n\t\t\t}\n\t\t`
                ),
              null != t.enum)
            ) {
              const n = JSON.stringify(t.enum);
              r.push(
                `\n\t\t\tfor (var i = 0; i < value.length; i++) {\n\t\t\t\tif (${n}.indexOf(value[i]) === -1) {\n\t\t\t\t\t${this.makeError(
                  {
                    type: "arrayEnum",
                    expected: '"' + t.enum.join(", ") + '"',
                    actual: "value[i]",
                    messages: e,
                  }
                )}\n\t\t\t\t}\n\t\t\t}\n\t\t`
              );
            }
            if (null != t.items) {
              r.push(
                "\n\t\t\tvar arr = value;\n\t\t\tvar parentField = field;\n\t\t\tfor (var i = 0; i < arr.length; i++) {\n\t\t"
              );
              const e = n + "[]",
                s = this.getRuleFromSchema(t.items),
                a =
                  'arr[i] = context.fn[%%INDEX%%](arr[i], (parentField ? parentField : "") + "[" + i + "]", parent, errors, context)';
              r.push(this.compileRule(s, i, e, a, "arr[i]")),
                r.push("\n\t\t\t}\n\t\t");
            }
            return r.push("\n\t\treturn value;\n\t"), { source: r.join("\n") };
          },
          Ht = function ({ schema: t, messages: e }, n, i) {
            const r = [];
            let s = !1;
            return (
              r.push("\n\t\tvar origValue = value;\n\t"),
              !0 === t.convert &&
                ((s = !0),
                r.push(
                  '\n\t\t\tif (typeof value !== "boolean") {\n\t\t\t\tif (\n\t\t\t\tvalue === 1\n\t\t\t\t|| value === "true"\n\t\t\t\t|| value === "1"\n\t\t\t\t|| value === "on"\n\t\t\t\t) {\n\t\t\t\t\tvalue = true;\n\t\t\t\t} else if (\n\t\t\t\tvalue === 0\n\t\t\t\t|| value === "false"\n\t\t\t\t|| value === "0"\n\t\t\t\t|| value === "off"\n\t\t\t\t) {\n\t\t\t\t\tvalue = false;\n\t\t\t\t}\n\t\t\t}\n\t\t'
                )),
              r.push(
                `\n\t\tif (typeof value !== "boolean") {\n\t\t\t${this.makeError(
                  { type: "boolean", actual: "origValue", messages: e }
                )}\n\t\t}\n\t\t\n\t\treturn value;\n\t`
              ),
              { sanitized: s, source: r.join("\n") }
            );
          },
          Ut = function ({ schema: t, messages: e, index: n }, i, r) {
            const s = [],
              a = t.instanceOf.name ? t.instanceOf.name : "<UnknowClass>";
            return (
              r.customs[n]
                ? (r.customs[n].schema = t)
                : (r.customs[n] = { schema: t }),
              s.push(
                `\n\t\tif (!(value instanceof context.customs[${n}].schema.instanceOf))\n\t\t\t${this.makeError(
                  {
                    type: "classInstanceOf",
                    actual: "value",
                    expected: "'" + a + "'",
                    messages: e,
                  }
                )}\n\t`
              ),
              s.push("\n\t\treturn value;\n\t"),
              { source: s.join("\n") }
            );
          },
          Qt = function ({ schema: t, messages: e, index: n }, i, r) {
            const s = [];
            return (
              s.push(
                `\n\t\t${this.makeCustomValidator({
                  fnName: "check",
                  path: i,
                  schema: t,
                  messages: e,
                  context: r,
                  ruleIndex: n,
                })}\n\t\treturn value;\n\t`
              ),
              { source: s.join("\n") }
            );
          };
        var Xt = function ({ schema: t, messages: e }, n, i) {
            const r = t.currencySymbol || null,
              s = t.thousandSeparator || ",",
              a = t.decimalSeparator || ".",
              o = t.customRegex;
            let u = !t.symbolOptional,
              l = "(?=.*\\d)^(-?~1|~1-?)(([0-9]\\d{0,2}(~2\\d{3})*)|0)?(\\~3\\d{1,2})?$"
                .replace(/~1/g, r ? `\\${r}${u ? "" : "?"}` : "")
                .replace("~2", s)
                .replace("~3", a);
            const c = [];
            return (
              c.push(
                `\n\t\tif (!value.match(${
                  o || new RegExp(l)
                })) {\n\t\t\t${this.makeError({
                  type: "currency",
                  actual: "value",
                  messages: e,
                })}\n\t\t\treturn value;\n\t\t}\n\n\t\treturn value;\n\t`
              ),
              { source: c.join("\n") }
            );
          },
          Zt = function ({ schema: t, messages: e }, n, i) {
            const r = [];
            let s = !1;
            return (
              r.push("\n\t\tvar origValue = value;\n\t"),
              !0 === t.convert &&
                ((s = !0),
                r.push(
                  "\n\t\t\tif (!(value instanceof Date)) {\n\t\t\t\tvalue = new Date(value);\n\t\t\t}\n\t\t"
                )),
              r.push(
                `\n\t\tif (!(value instanceof Date) || isNaN(value.getTime()))\n\t\t\t${this.makeError(
                  { type: "date", actual: "origValue", messages: e }
                )}\n\n\t\treturn value;\n\t`
              ),
              { sanitized: s, source: r.join("\n") }
            );
          };
        const Yt = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          te = /^\S+@\S+\.\S+$/;
        var ee = function ({ schema: t, messages: e }, n, i) {
            const r = [],
              s = "precise" == t.mode ? Yt : te;
            let a = !1;
            return (
              r.push(
                `\n\t\tif (typeof value !== "string") {\n\t\t\t${this.makeError(
                  { type: "string", actual: "value", messages: e }
                )}\n\t\t\treturn value;\n\t\t}\n\t`
              ),
              t.empty
                ? r.push("\n\t\t\tif (value.length === 0) return value;\n\t\t")
                : r.push(
                    `\n\t\t\tif (value.length === 0) {\n\t\t\t\t${this.makeError(
                      { type: "emailEmpty", actual: "value", messages: e }
                    )}\n\t\t\t\treturn value;\n\t\t\t}\n\t\t`
                  ),
              t.normalize &&
                ((a = !0),
                r.push("\n\t\t\tvalue = value.trim().toLowerCase();\n\t\t")),
              null != t.min &&
                r.push(
                  `\n\t\t\tif (value.length < ${
                    t.min
                  }) {\n\t\t\t\t${this.makeError({
                    type: "emailMin",
                    expected: t.min,
                    actual: "value.length",
                    messages: e,
                  })}\n\t\t\t}\n\t\t`
                ),
              null != t.max &&
                r.push(
                  `\n\t\t\tif (value.length > ${
                    t.max
                  }) {\n\t\t\t\t${this.makeError({
                    type: "emailMax",
                    expected: t.max,
                    actual: "value.length",
                    messages: e,
                  })}\n\t\t\t}\n\t\t`
                ),
              r.push(
                `\n\t\tif (!${s.toString()}.test(value)) {\n\t\t\t${this.makeError(
                  { type: "email", actual: "value", messages: e }
                )}\n\t\t}\n\n\t\treturn value;\n\t`
              ),
              { sanitized: a, source: r.join("\n") }
            );
          },
          ne = function ({ schema: t, messages: e }, n, i) {
            return {
              source: `\n\t\t\tif (${JSON.stringify(
                t.values || []
              )}.indexOf(value) === -1)\n\t\t\t\t${this.makeError({
                type: "enumValue",
                expected: '"' + t.values.join(", ") + '"',
                actual: "value",
                messages: e,
              })}\n\t\t\t\n\t\t\treturn value;\n\t\t`,
            };
          },
          ie = function ({ schema: t, messages: e }, n, i) {
            const r = [];
            return (
              t.field
                ? (t.strict
                    ? r.push(
                        `\n\t\t\t\tif (value !== parent["${t.field}"])\n\t\t\t`
                      )
                    : r.push(
                        `\n\t\t\t\tif (value != parent["${t.field}"])\n\t\t\t`
                      ),
                  r.push(
                    `\n\t\t\t\t${this.makeError({
                      type: "equalField",
                      actual: "value",
                      expected: JSON.stringify(t.field),
                      messages: e,
                    })}\n\t\t`
                  ))
                : (t.strict
                    ? r.push(
                        `\n\t\t\t\tif (value !== ${JSON.stringify(
                          t.value
                        )})\n\t\t\t`
                      )
                    : r.push(
                        `\n\t\t\t\tif (value != ${JSON.stringify(
                          t.value
                        )})\n\t\t\t`
                      ),
                  r.push(
                    `\n\t\t\t\t${this.makeError({
                      type: "equalValue",
                      actual: "value",
                      expected: JSON.stringify(t.value),
                      messages: e,
                    })}\n\t\t`
                  )),
              r.push("\n\t\treturn value;\n\t"),
              { source: r.join("\n") }
            );
          },
          re = function ({ schema: t, messages: e }, n, i) {
            const r = [];
            return (
              r.push("\n\t\tif (value !== null && value !== undefined) {\n\t"),
              t.remove
                ? r.push("\n\t\t\treturn undefined;\n\t\t")
                : r.push(
                    `\n\t\t\t${this.makeError({
                      type: "forbidden",
                      actual: "value",
                      messages: e,
                    })}\n\t\t`
                  ),
              r.push("\n\t\t}\n\n\t\treturn value;\n\t"),
              { source: r.join("\n") }
            );
          },
          se = function ({ schema: t, messages: e }, n, i) {
            return {
              source: `\n\t\t\tif (typeof value !== "function")\n\t\t\t\t${this.makeError(
                { type: "function", actual: "value", messages: e }
              )}\n\n\t\t\treturn value;\n\t\t`,
            };
          },
          ae = function ({ schema: t, messages: e }, n, i) {
            const r = [];
            r.push(
              "\n\t\tvar prevErrLen = errors.length;\n\t\tvar errBefore;\n\t\tvar hasValid = false;\n\t\tvar newVal = value;\n\t"
            );
            for (let e = 0; e < t.rules.length; e++) {
              r.push(
                "\n\t\t\tif (!hasValid) {\n\t\t\t\terrBefore = errors.length;\n\t\t"
              );
              const s = this.getRuleFromSchema(t.rules[e]);
              r.push(
                this.compileRule(
                  s,
                  i,
                  n,
                  "var tmpVal = context.fn[%%INDEX%%](value, field, parent, errors, context);",
                  "tmpVal"
                )
              ),
                r.push(
                  "\n\t\t\t\tif (errors.length == errBefore) {\n\t\t\t\t\thasValid = true;\n\t\t\t\t\tnewVal = tmpVal;\n\t\t\t\t}\n\t\t\t}\n\t\t"
                );
            }
            return (
              r.push(
                "\n\t\tif (hasValid) {\n\t\t\terrors.length = prevErrLen;\n\t\t}\n\t\t\n\t\treturn newVal;\n\t"
              ),
              { source: r.join("\n") }
            );
          },
          oe = function ({ schema: t, messages: e }, n, i) {
            const r = [];
            r.push("\n\t\tvar origValue = value;\n\t");
            let s = !1;
            return (
              !0 === t.convert &&
                ((s = !0),
                r.push(
                  '\n\t\t\tif (typeof value !== "number") {\n\t\t\t\tvalue = Number(value);\n\t\t\t}\n\t\t'
                )),
              r.push(
                `\n\t\tif (typeof value !== "number" || isNaN(value) || !isFinite(value)) {\n\t\t\t${this.makeError(
                  { type: "number", actual: "origValue", messages: e }
                )}\n\t\t\treturn value;\n\t\t}\n\t`
              ),
              null != t.min &&
                r.push(
                  `\n\t\t\tif (value < ${t.min}) {\n\t\t\t\t${this.makeError({
                    type: "numberMin",
                    expected: t.min,
                    actual: "origValue",
                    messages: e,
                  })}\n\t\t\t}\n\t\t`
                ),
              null != t.max &&
                r.push(
                  `\n\t\t\tif (value > ${t.max}) {\n\t\t\t\t${this.makeError({
                    type: "numberMax",
                    expected: t.max,
                    actual: "origValue",
                    messages: e,
                  })}\n\t\t\t}\n\t\t`
                ),
              null != t.equal &&
                r.push(
                  `\n\t\t\tif (value !== ${
                    t.equal
                  }) {\n\t\t\t\t${this.makeError({
                    type: "numberEqual",
                    expected: t.equal,
                    actual: "origValue",
                    messages: e,
                  })}\n\t\t\t}\n\t\t`
                ),
              null != t.notEqual &&
                r.push(
                  `\n\t\t\tif (value === ${
                    t.notEqual
                  }) {\n\t\t\t\t${this.makeError({
                    type: "numberNotEqual",
                    expected: t.notEqual,
                    actual: "origValue",
                    messages: e,
                  })}\n\t\t\t}\n\t\t`
                ),
              !0 === t.integer &&
                r.push(
                  `\n\t\t\tif (value % 1 !== 0) {\n\t\t\t\t${this.makeError({
                    type: "numberInteger",
                    actual: "origValue",
                    messages: e,
                  })}\n\t\t\t}\n\t\t`
                ),
              !0 === t.positive &&
                r.push(
                  `\n\t\t\tif (value <= 0) {\n\t\t\t\t${this.makeError({
                    type: "numberPositive",
                    actual: "origValue",
                    messages: e,
                  })}\n\t\t\t}\n\t\t`
                ),
              !0 === t.negative &&
                r.push(
                  `\n\t\t\tif (value >= 0) {\n\t\t\t\t${this.makeError({
                    type: "numberNegative",
                    actual: "origValue",
                    messages: e,
                  })}\n\t\t\t}\n\t\t`
                ),
              r.push("\n\t\treturn value;\n\t"),
              { sanitized: s, source: r.join("\n") }
            );
          };
        const ue = /^[_$a-zA-Z][_$a-zA-Z0-9]*$/,
          le = /["'\\\n\r\u2028\u2029]/g;
        function ce(t) {
          return t.replace(le, function (t) {
            switch (t) {
              case '"':
              case "'":
              case "\\":
                return "\\" + t;
              case "\n":
                return "\\n";
              case "\r":
                return "\\r";
              case "\u2028":
                return "\\u2028";
              case "\u2029":
                return "\\u2029";
            }
          });
        }
        var he = function ({ schema: t, messages: e }, n, i) {
            const r = [];
            r.push(
              `\n\t\tif (typeof value !== "object" || value === null || Array.isArray(value)) {\n\t\t\t${this.makeError(
                { type: "object", actual: "value", messages: e }
              )}\n\t\t\treturn value;\n\t\t}\n\t`
            );
            const s = t.properties || t.props;
            if (s) {
              r.push("var parentObj = value;"),
                r.push("var parentField = field;");
              const a = Object.keys(s);
              for (let t = 0; t < a.length; t++) {
                const e = a[t],
                  o = ce(e),
                  u = ue.test(o) ? `.${o}` : `['${o}']`,
                  l = `parentObj${u}`,
                  c = (n ? n + "." : "") + e;
                r.push(`\n// Field: ${ce(c)}`),
                  r.push(
                    `field = parentField ? parentField + "${u}" : "${o}";`
                  ),
                  r.push(`value = ${l};`);
                const h = this.getRuleFromSchema(s[e]),
                  p = `\n\t\t\t\t${l} = context.fn[%%INDEX%%](value, field, parentObj, errors, context);\n\t\t\t`;
                r.push(this.compileRule(h, i, c, p, l));
              }
              if (t.strict) {
                const n = Object.keys(s);
                r.push(
                  `\n\t\t\t\tfield = parentField;\n\t\t\t\tvar invalidProps = [];\n\t\t\t\tvar props = Object.keys(parentObj);\n\n\t\t\t\tfor (let i = 0; i < props.length; i++) {\n\t\t\t\t\tif (${JSON.stringify(
                    n
                  )}.indexOf(props[i]) === -1) {\n\t\t\t\t\t\tinvalidProps.push(props[i]);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tif (invalidProps.length) {\n\t\t\t`
                ),
                  "remove" == t.strict
                    ? r.push(
                        "\n\t\t\t\t\tinvalidProps.forEach(function(field) {\n\t\t\t\t\t\tdelete parentObj[field];\n\t\t\t\t\t});\n\t\t\t\t"
                      )
                    : r.push(
                        `\n\t\t\t\t\t${this.makeError({
                          type: "objectStrict",
                          expected: '"' + n.join(", ") + '"',
                          actual: "invalidProps.join(', ')",
                          messages: e,
                        })}\n\t\t\t\t`
                      ),
                  r.push("\n\t\t\t\t}\n\t\t\t");
              }
            }
            return (
              (null == t.minProps && null == t.maxProps) ||
                (t.strict
                  ? r.push(
                      `\n\t\t\t\tprops = Object.keys(${
                        s ? "parentObj" : "value"
                      });\n\t\t\t`
                    )
                  : r.push(
                      `\n\t\t\t\tvar props = Object.keys(${
                        s ? "parentObj" : "value"
                      });\n\t\t\t\t${s ? "field = parentField;" : ""}\n\t\t\t`
                    )),
              null != t.minProps &&
                r.push(
                  `\n\t\t\tif (props.length < ${
                    t.minProps
                  }) {\n\t\t\t\t${this.makeError({
                    type: "objectMinProps",
                    expected: t.minProps,
                    actual: "props.length",
                    messages: e,
                  })}\n\t\t\t}\n\t\t`
                ),
              null != t.maxProps &&
                r.push(
                  `\n\t\t\tif (props.length > ${
                    t.maxProps
                  }) {\n\t\t\t\t${this.makeError({
                    type: "objectMaxProps",
                    expected: t.maxProps,
                    actual: "props.length",
                    messages: e,
                  })}\n\t\t\t}\n\t\t`
                ),
              s
                ? r.push("\n\t\t\treturn parentObj;\n\t\t")
                : r.push("\n\t\t\treturn value;\n\t\t"),
              { source: r.join("\n") }
            );
          },
          pe = function ({ schema: t, messages: e, index: n }, i, r) {
            const s = [];
            return (
              r.customs[n]
                ? (r.customs[n].schema = t)
                : (r.customs[n] = { schema: t }),
              s.push(
                `\n\t\tconst ObjectID = context.customs[${n}].schema.ObjectID;\n\t\tif (!ObjectID.isValid(value)) {\n\t\t\t${this.makeError(
                  { type: "objectID", actual: "value", messages: e }
                )}\n\t\t\treturn;\n\t\t}\n\t`
              ),
              !0 === t.convert
                ? s.push("return new ObjectID(value)")
                : "hexString" === t.convert
                ? s.push("return value.toString()")
                : s.push("return value"),
              { source: s.join("\n") }
            );
          };
        const de = /^-?[0-9]\d*(\.\d+)?$/,
          fe = /^[a-zA-Z]+$/,
          me = /^[a-zA-Z0-9]+$/,
          ve = /^[a-zA-Z0-9_-]+$/,
          ye = /^[0-9a-fA-F]+$/,
          ge = /^(?:[A-Za-z0-9+\\/]{4})*(?:[A-Za-z0-9+\\/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
        var be = function ({ schema: t, messages: e }, n, i) {
            const r = [];
            let s = !1;
            if (
              (!0 === t.convert &&
                ((s = !0),
                r.push(
                  '\n\t\t\tif (typeof value !== "string") {\n\t\t\t\tvalue = String(value);\n\t\t\t}\n\t\t'
                )),
              r.push(
                `\n\t\tif (typeof value !== "string") {\n\t\t\t${this.makeError(
                  { type: "string", actual: "value", messages: e }
                )}\n\t\t\treturn value;\n\t\t}\n\n\t\tvar origValue = value;\n\t`
              ),
              t.trim &&
                ((s = !0), r.push("\n\t\t\tvalue = value.trim();\n\t\t")),
              t.trimLeft &&
                ((s = !0), r.push("\n\t\t\tvalue = value.trimLeft();\n\t\t")),
              t.trimRight &&
                ((s = !0), r.push("\n\t\t\tvalue = value.trimRight();\n\t\t")),
              t.padStart)
            ) {
              s = !0;
              const e = null != t.padChar ? t.padChar : " ";
              r.push(
                `\n\t\t\tvalue = value.padStart(${t.padStart}, ${JSON.stringify(
                  e
                )});\n\t\t`
              );
            }
            if (t.padEnd) {
              s = !0;
              const e = null != t.padChar ? t.padChar : " ";
              r.push(
                `\n\t\t\tvalue = value.padEnd(${t.padEnd}, ${JSON.stringify(
                  e
                )});\n\t\t`
              );
            }
            if (
              (t.lowercase &&
                ((s = !0),
                r.push("\n\t\t\tvalue = value.toLowerCase();\n\t\t")),
              t.uppercase &&
                ((s = !0),
                r.push("\n\t\t\tvalue = value.toUpperCase();\n\t\t")),
              t.localeLowercase &&
                ((s = !0),
                r.push("\n\t\t\tvalue = value.toLocaleLowerCase();\n\t\t")),
              t.localeUppercase &&
                ((s = !0),
                r.push("\n\t\t\tvalue = value.toLocaleUpperCase();\n\t\t")),
              r.push("\n\t\t\tvar len = value.length;\n\t"),
              !1 === t.empty &&
                r.push(
                  `\n\t\t\tif (len === 0) {\n\t\t\t\t${this.makeError({
                    type: "stringEmpty",
                    actual: "value",
                    messages: e,
                  })}\n\t\t\t}\n\t\t`
                ),
              null != t.min &&
                r.push(
                  `\n\t\t\tif (len < ${t.min}) {\n\t\t\t\t${this.makeError({
                    type: "stringMin",
                    expected: t.min,
                    actual: "len",
                    messages: e,
                  })}\n\t\t\t}\n\t\t`
                ),
              null != t.max &&
                r.push(
                  `\n\t\t\tif (len > ${t.max}) {\n\t\t\t\t${this.makeError({
                    type: "stringMax",
                    expected: t.max,
                    actual: "len",
                    messages: e,
                  })}\n\t\t\t}\n\t\t`
                ),
              null != t.length &&
                r.push(
                  `\n\t\t\tif (len !== ${
                    t.length
                  }) {\n\t\t\t\t${this.makeError({
                    type: "stringLength",
                    expected: t.length,
                    actual: "len",
                    messages: e,
                  })}\n\t\t\t}\n\t\t`
                ),
              null != t.pattern)
            ) {
              let n = t.pattern;
              "string" == typeof t.pattern &&
                (n = new RegExp(t.pattern, t.patternFlags));
              const i = `\n\t\t\tif (!${n.toString()}.test(value))\n\t\t\t\t${this.makeError(
                {
                  type: "stringPattern",
                  expected: `"${n.toString().replace(/"/g, "\\$&")}"`,
                  actual: "origValue",
                  messages: e,
                }
              )}\n\t\t`;
              r.push(
                `\n\t\t\tif (${t.empty} === true && len === 0) {\n\t\t\t\t// Do nothing\n\t\t\t} else {\n\t\t\t\t${i}\n\t\t\t}\n\t\t`
              );
            }
            if (
              (null != t.contains &&
                r.push(
                  `\n\t\t\tif (value.indexOf("${
                    t.contains
                  }") === -1) {\n\t\t\t\t${this.makeError({
                    type: "stringContains",
                    expected: '"' + t.contains + '"',
                    actual: "origValue",
                    messages: e,
                  })}\n\t\t\t}\n\t\t`
                ),
              null != t.enum)
            ) {
              const n = JSON.stringify(t.enum);
              r.push(
                `\n\t\t\tif (${n}.indexOf(value) === -1) {\n\t\t\t\t${this.makeError(
                  {
                    type: "stringEnum",
                    expected: '"' + t.enum.join(", ") + '"',
                    actual: "origValue",
                    messages: e,
                  }
                )}\n\t\t\t}\n\t\t`
              );
            }
            return (
              !0 === t.numeric &&
                r.push(
                  `\n\t\t\tif (!${de.toString()}.test(value) ) {\n\t\t\t\t${this.makeError(
                    { type: "stringNumeric", actual: "origValue", messages: e }
                  )}\n\t\t\t}\n\t\t`
                ),
              !0 === t.alpha &&
                r.push(
                  `\n\t\t\tif(!${fe.toString()}.test(value)) {\n\t\t\t\t${this.makeError(
                    { type: "stringAlpha", actual: "origValue", messages: e }
                  )}\n\t\t\t}\n\t\t`
                ),
              !0 === t.alphanum &&
                r.push(
                  `\n\t\t\tif(!${me.toString()}.test(value)) {\n\t\t\t\t${this.makeError(
                    { type: "stringAlphanum", actual: "origValue", messages: e }
                  )}\n\t\t\t}\n\t\t`
                ),
              !0 === t.alphadash &&
                r.push(
                  `\n\t\t\tif(!${ve.toString()}.test(value)) {\n\t\t\t\t${this.makeError(
                    {
                      type: "stringAlphadash",
                      actual: "origValue",
                      messages: e,
                    }
                  )}\n\t\t\t}\n\t\t`
                ),
              !0 === t.hex &&
                r.push(
                  `\n\t\t\tif(value.length % 2 !== 0 || !${ye.toString()}.test(value)) {\n\t\t\t\t${this.makeError(
                    { type: "stringHex", actual: "origValue", messages: e }
                  )}\n\t\t\t}\n\t\t`
                ),
              !0 === t.singleLine &&
                r.push(
                  `\n\t\t\tif(value.includes("\\n")) {\n\t\t\t\t${this.makeError(
                    { type: "stringSingleLine", messages: e }
                  )}\n\t\t\t}\n\t\t`
                ),
              !0 === t.base64 &&
                r.push(
                  `\n\t\t\tif(!${ge.toString()}.test(value)) {\n\t\t\t\t${this.makeError(
                    { type: "stringBase64", actual: "origValue", messages: e }
                  )}\n\t\t\t}\n\t\t`
                ),
              r.push("\n\t\treturn value;\n\t"),
              { sanitized: s, source: r.join("\n") }
            );
          },
          ke = function ({ schema: t, messages: e }, n, i) {
            const r = [];
            if (null != t.items) {
              if (!Array.isArray(t.items))
                throw new Error(
                  `Invalid '${t.type}' schema. The 'items' field must be an array.`
                );
              if (0 === t.items.length)
                throw new Error(
                  `Invalid '${t.type}' schema. The 'items' field must not be an empty array.`
                );
            }
            if (
              (r.push(
                `\n\t\tif (!Array.isArray(value)) {\n\t\t\t${this.makeError({
                  type: "tuple",
                  actual: "value",
                  messages: e,
                })}\n\t\t\treturn value;\n\t\t}\n\n\t\tvar len = value.length;\n\t`
              ),
              !1 === t.empty &&
                r.push(
                  `\n\t\t\tif (len === 0) {\n\t\t\t\t${this.makeError({
                    type: "tupleEmpty",
                    actual: "value",
                    messages: e,
                  })}\n\t\t\t\treturn value;\n\t\t\t}\n\t\t`
                ),
              null != t.items)
            ) {
              r.push(
                `\n\t\t\tif (${
                  t.empty
                } !== false && len === 0) {\n\t\t\t\treturn value;\n\t\t\t}\n\n\t\t\tif (len !== ${
                  t.items.length
                }) {\n\t\t\t\t${this.makeError({
                  type: "tupleLength",
                  expected: t.items.length,
                  actual: "len",
                  messages: e,
                })}\n\t\t\t\treturn value;\n\t\t\t}\n\t\t`
              ),
                r.push(
                  "\n\t\t\tvar arr = value;\n\t\t\tvar parentField = field;\n\t\t"
                );
              for (let e = 0; e < t.items.length; e++) {
                const s = `${n}[${e}]`,
                  a = this.getRuleFromSchema(t.items[e]),
                  o = `\n\t\t\tarr[${e}] = context.fn[%%INDEX%%](arr[${e}], (parentField ? parentField : "") + "[" + ${e} + "]", parent, errors, context);\n\t\t`;
                r.push(this.compileRule(a, i, s, o, `arr[${e}]`));
              }
            }
            return r.push("\n\t\treturn value;\n\t"), { source: r.join("\n") };
          };
        const xe = /^https?:\/\/\S+/;
        var we = function ({ schema: t, messages: e }, n, i) {
          const r = [];
          return (
            r.push(
              `\n\t\tif (typeof value !== "string") {\n\t\t\t${this.makeError({
                type: "string",
                actual: "value",
                messages: e,
              })}\n\t\t\treturn value;\n\t\t}\n\t`
            ),
            t.empty
              ? r.push("\n\t\t\tif (value.length === 0) return value;\n\t\t")
              : r.push(
                  `\n\t\t\tif (value.length === 0) {\n\t\t\t\t${this.makeError({
                    type: "urlEmpty",
                    actual: "value",
                    messages: e,
                  })}\n\t\t\t\treturn value;\n\t\t\t}\n\t\t`
                ),
            r.push(
              `\n\t\tif (!${xe.toString()}.test(value)) {\n\t\t\t${this.makeError(
                { type: "url", actual: "value", messages: e }
              )}\n\t\t}\n\n\t\treturn value;\n\t`
            ),
            { source: r.join("\n") }
          );
        };
        const Ce = /^([0-9a-f]{8}-[0-9a-f]{4}-[1-6][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}|[0]{8}-[0]{4}-[0]{4}-[0]{4}-[0]{12})$/i;
        var Oe = function ({ schema: t, messages: e }, n) {
          const i = [];
          return (
            i.push(
              `\n\t\tif (typeof value !== "string") {\n\t\t\t${this.makeError({
                type: "string",
                actual: "value",
                messages: e,
              })}\n\t\t\treturn value;\n\t\t}\n\n\t\tvar val = value.toLowerCase();\n\t\tif (!${Ce.toString()}.test(val)) {\n\t\t\t${this.makeError(
                { type: "uuid", actual: "value", messages: e }
              )}\n\t\t\treturn value;\n\t\t}\n\n\t\tconst version = val.charAt(14) | 0;\n\t`
            ),
            parseInt(t.version) < 7 &&
              i.push(
                `\n\t\t\tif (${
                  t.version
                } !== version) {\n\t\t\t\t${this.makeError({
                  type: "uuidVersion",
                  expected: t.version,
                  actual: "version",
                  messages: e,
                })}\n\t\t\t\treturn value;\n\t\t\t}\n\t\t`
              ),
            i.push(
              `\n\t\tswitch (version) {\n\t\tcase 0:\n\t\tcase 1:\n\t\tcase 2:\n\t\tcase 6:\n\t\t\tbreak;\n\t\tcase 3:\n\t\tcase 4:\n\t\tcase 5:\n\t\t\tif (["8", "9", "a", "b"].indexOf(val.charAt(19)) === -1) {\n\t\t\t\t${this.makeError(
                { type: "uuid", actual: "value", messages: e }
              )}\n\t\t\t}\n\t\t}\n\n\t\treturn value;\n\t`
            ),
            { source: i.join("\n") }
          );
        };
        const Ie = /^((([a-f0-9][a-f0-9]+[-]){5}|([a-f0-9][a-f0-9]+[:]){5})([a-f0-9][a-f0-9])$)|(^([a-f0-9][a-f0-9][a-f0-9][a-f0-9]+[.]){2}([a-f0-9][a-f0-9][a-f0-9][a-f0-9]))$/i;
        var Pe = function ({ schema: t, messages: e }, n, i) {
            return {
              source: `\n\t\t\tif (typeof value !== "string") {\n\t\t\t\t${this.makeError(
                { type: "string", actual: "value", messages: e }
              )}\n\t\t\t\treturn value;\n\t\t\t}\n\n\t\t\tvar v = value.toLowerCase();\n\t\t\tif (!${Ie.toString()}.test(v)) {\n\t\t\t\t${this.makeError(
                { type: "mac", actual: "value", messages: e }
              )}\n\t\t\t}\n\t\t\t\n\t\t\treturn value;\n\t\t`,
            };
          },
          Ee = function ({ schema: t, messages: e }, n, i) {
            return {
              source: `\n\t\t\tif (typeof value !== "string") {\n\t\t\t\t${this.makeError(
                { type: "string", actual: "value", messages: e }
              )}\n\t\t\t\treturn value;\n\t\t\t}\n\n\t\t\tif (typeof value !== "string")\n\t\t\t\tvalue = String(value);\n\n\t\t\tval = value.replace(/\\D+/g, "");\n\n\t\t\tvar array = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];\n\t\t\tvar len = val ? val.length : 0,\n\t\t\t\tbit = 1,\n\t\t\t\tsum = 0;\n\t\t\twhile (len--) {\n\t\t\t\tsum += !(bit ^= 1) ? parseInt(val[len], 10) : array[val[len]];\n\t\t\t}\n\n\t\t\tif (!(sum % 10 === 0 && sum > 0)) {\n\t\t\t\t${this.makeError(
                { type: "luhn", actual: "value", messages: e }
              )}\n\t\t\t}\n\n\t\t\treturn value;\n\t\t`,
            };
          };
        function Ae(t) {
          var e = { exports: {} };
          return t(e, e.exports), e.exports;
        }
        function _e(t) {
          throw new Error(
            'Could not dynamically require "' +
              t +
              '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.'
          );
        }
        let De, Te, Se, Me;
        var je = function (t) {
          De ||
            ((De = _e("prettier")),
            (Te = {
              parser: "babel",
              useTabs: !1,
              printWidth: 120,
              trailingComma: "none",
              tabWidth: 4,
              singleQuote: !1,
              semi: !0,
              bracketSpacing: !0,
            }),
            (Se = _e("cli-highlight")),
            (Me = {
              language: "js",
              theme: Se.fromJson({
                keyword: ["white", "bold"],
                built_in: "magenta",
                literal: "cyan",
                number: "magenta",
                regexp: "red",
                string: ["yellow", "bold"],
                symbol: "plain",
                class: "blue",
                attr: "plain",
                function: ["white", "bold"],
                title: "plain",
                params: "green",
                comment: "grey",
              }),
            }));
          const e = De.format(t, Te);
          return Se.highlight(e, Me);
        };
        var Ve = class {
            constructor(t) {
              if (
                ((this.opts = {}),
                (this.defaults = {}),
                (this.messages = Object.assign({}, Kt)),
                (this.rules = {
                  any: Jt,
                  array: Wt,
                  boolean: Ht,
                  class: Ut,
                  custom: Qt,
                  currency: Xt,
                  date: Zt,
                  email: ee,
                  enum: ne,
                  equal: ie,
                  forbidden: re,
                  function: se,
                  multi: ae,
                  number: oe,
                  object: he,
                  objectID: pe,
                  string: be,
                  tuple: ke,
                  url: we,
                  uuid: Oe,
                  mac: Pe,
                  luhn: Ee,
                }),
                (this.aliases = {}),
                (this.cache = new Map()),
                t)
              ) {
                if (
                  (qt(this.opts, t),
                  t.defaults && qt(this.defaults, t.defaults),
                  t.messages)
                )
                  for (const e in t.messages) this.addMessage(e, t.messages[e]);
                if (t.aliases)
                  for (const e in t.aliases) this.alias(e, t.aliases[e]);
                if (t.customRules)
                  for (const e in t.customRules) this.add(e, t.customRules[e]);
                if (t.plugins) {
                  const e = t.plugins;
                  if (!Array.isArray(e))
                    throw new Error("Plugins type must be array");
                  e.forEach(this.plugin.bind(this));
                }
              }
            }
            validate(t, e) {
              return this.compile(e)(t);
            }
            wrapRequiredCheckSourceCode(t, e, n, i) {
              const r = [];
              let s,
                a = !0 === t.schema.optional || "forbidden" === t.schema.type,
                o =
                  !0 === t.schema.optional ||
                  !0 === t.schema.nullable ||
                  "forbidden" === t.schema.type;
              if (null != t.schema.default) {
                let e;
                (a = !1),
                  !0 !== t.schema.nullable && (o = !1),
                  "function" == typeof t.schema.default
                    ? (n.customs[t.index] || (n.customs[t.index] = {}),
                      (n.customs[t.index].defaultFn = t.schema.default),
                      (e = `context.customs[${t.index}].defaultFn()`))
                    : (e = JSON.stringify(t.schema.default)),
                  (s = `\n\t\t\t\tvalue = ${e};\n\t\t\t\t${i} = value;\n\t\t\t`);
              } else
                s = this.makeError({
                  type: "required",
                  actual: "value",
                  messages: t.messages,
                });
              return (
                r.push(
                  `\n\t\t\tif (value === undefined) { ${
                    a ? "\n// allow undefined\n" : s
                  } }\n\t\t\telse if (value === null) { ${
                    o ? "\n// allow null\n" : s
                  } }\n\t\t\t${e ? `else { ${e} }` : ""}\n\t\t`
                ),
                r.join("\n")
              );
            }
            compile(t) {
              if (null === t || "object" != typeof t)
                throw new Error("Invalid schema.");
              const e = this,
                n = { index: 0, rules: [], fn: [], customs: {} };
              if ((this.cache.clear(), !0 !== t.$$root))
                if (Array.isArray(t)) {
                  t = this.getRuleFromSchema(t).schema;
                } else {
                  const e = Object.assign({}, t);
                  (t = { type: "object", strict: e.$$strict, properties: e }),
                    delete e.$$strict;
                }
              const i = [
                  "var errors = [];",
                  "var field;",
                  "var parent = null;",
                ],
                r = this.getRuleFromSchema(t);
              i.push(
                this.compileRule(
                  r,
                  n,
                  null,
                  "context.fn[%%INDEX%%](value, field, null, errors, context);",
                  "value"
                )
              ),
                i.push("if (errors.length) {"),
                i.push(
                  '\n\t\t\treturn errors.map(err => {\n\t\t\t\tif (err.message)\n\t\t\t\t\terr.message = err.message\n\t\t\t\t\t\t.replace(/\\{field\\}/g, err.field || "")\n\t\t\t\t\t\t.replace(/\\{expected\\}/g, err.expected != null ? err.expected : "")\n\t\t\t\t\t\t.replace(/\\{actual\\}/g, err.actual != null ? err.actual : "");\n\n\t\t\t\treturn err;\n\t\t\t});\n\t\t'
                ),
                i.push("}"),
                i.push("return true;");
              const s = i.join("\n"),
                a = new Function("value", "context", s);
              if (this.opts.debug) {
                let t = function (t) {
                  return t;
                };
                "undefined" == typeof window && (t = je),
                  n.fn.forEach((e, n) =>
                    console.log(t(`// Context.fn[${n}]\n` + e.toString()))
                  ),
                  console.log(t("// Main check function\n" + a.toString()));
              }
              return (
                this.cache.clear(),
                function (t) {
                  return (n.data = t), a.call(e, t, n);
                }
              );
            }
            compileRule(t, e, n, i, r) {
              const s = [],
                a = this.cache.get(t.schema);
              if (a)
                ((t = a).cycle = !0),
                  (t.cycleStack = []),
                  s.push(
                    this.wrapRequiredCheckSourceCode(
                      t,
                      `\n\t\t\t\tvar rule = context.rules[${
                        t.index
                      }];\n\t\t\t\tif (rule.cycleStack.indexOf(value) === -1) {\n\t\t\t\t\trule.cycleStack.push(value);\n\t\t\t\t\t${i.replace(
                        /%%INDEX%%/g,
                        t.index
                      )}\n\t\t\t\t\trule.cycleStack.pop(value);\n\t\t\t\t}\n\t\t\t`,
                      e,
                      r
                    )
                  );
              else {
                this.cache.set(t.schema, t),
                  (t.index = e.index),
                  (e.rules[e.index] = t);
                const a = null != n ? n : "$$root";
                e.index++;
                const o = t.ruleFunction.call(this, t, n, e);
                o.source = o.source.replace(/%%INDEX%%/g, t.index);
                const u = new Function(
                  "value",
                  "field",
                  "parent",
                  "errors",
                  "context",
                  o.source
                );
                (e.fn[t.index] = u),
                  s.push(
                    this.wrapRequiredCheckSourceCode(
                      t,
                      i.replace(/%%INDEX%%/g, t.index),
                      e,
                      r
                    )
                  ),
                  s.push(
                    this.makeCustomValidator({
                      vName: r,
                      path: a,
                      schema: t.schema,
                      context: e,
                      messages: t.messages,
                      ruleIndex: t.index,
                    })
                  );
              }
              return s.join("\n");
            }
            getRuleFromSchema(t) {
              if ("string" == typeof t) t = this.parseShortHand(t);
              else if (Array.isArray(t)) {
                if (0 == t.length) throw new Error("Invalid schema.");
                (t = { type: "multi", rules: t }).rules
                  .map((t) => this.getRuleFromSchema(t))
                  .every((t) => 1 == t.schema.optional) && (t.optional = !0);
              }
              if (t.$$type) {
                const e = t.$$type,
                  n = this.getRuleFromSchema(e).schema;
                delete t.$$type;
                const i = Object.assign({}, t);
                for (const e in t) delete t[e];
                qt(t, n, { skipIfExist: !0 }), (t.props = i);
              }
              const e = this.aliases[t.type];
              e && (delete t.type, (t = qt(t, e, { skipIfExist: !0 })));
              const n = this.rules[t.type];
              if (!n)
                throw new Error(
                  "Invalid '" + t.type + "' type in validator schema."
                );
              return {
                messages: Object.assign({}, this.messages, t.messages),
                schema: qt(t, this.defaults[t.type], { skipIfExist: !0 }),
                ruleFunction: n,
              };
            }
            parseShortHand(t) {
              const e = t.split("|").map((t) => t.trim());
              let n,
                i = e[0];
              return (
                (n = i.endsWith("[]")
                  ? this.getRuleFromSchema({
                      type: "array",
                      items: i.slice(0, -2),
                    }).schema
                  : { type: e[0] }),
                e.slice(1).map((t) => {
                  const e = t.indexOf(":");
                  if (-1 !== e) {
                    const i = t.substr(0, e).trim();
                    let r = t.substr(e + 1).trim();
                    "true" === r || "false" === r
                      ? (r = "true" === r)
                      : Number.isNaN(Number(r)) || (r = Number(r)),
                      (n[i] = r);
                  } else
                    t.startsWith("no-") ? (n[t.slice(3)] = !1) : (n[t] = !0);
                }),
                n
              );
            }
            makeError({
              type: t,
              field: e,
              expected: n,
              actual: i,
              messages: r,
            }) {
              const s = { type: `"${t}"`, message: `"${r[t]}"` };
              (s.field = e ? `"${e}"` : "field"),
                null != n && (s.expected = n),
                null != i && (s.actual = i);
              return `errors.push({ ${Object.keys(s)
                .map((t) => `${t}: ${s[t]}`)
                .join(", ")} });`;
            }
            makeCustomValidator({
              vName: t = "value",
              fnName: e = "custom",
              ruleIndex: n,
              path: i,
              schema: r,
              context: s,
              messages: a,
            }) {
              const o = "rule" + n,
                u = "fnCustomErrors" + n;
              if ("function" == typeof r[e]) {
                if (
                  (s.customs[n]
                    ? ((s.customs[n].messages = a), (s.customs[n].schema = r))
                    : (s.customs[n] = { messages: a, schema: r }),
                  this.opts.useNewCustomCheckerFunction)
                )
                  return `\n               const ${o} = context.customs[${n}];\n\t\t\t\t\tconst ${u} = [];\n\t\t\t\t\t${t} = ${o}.schema.${e}.call(this, ${t}, ${u} , ${o}.schema, "${i}", parent, context);\n\t\t\t\t\tif (Array.isArray(${u} )) {\n                  ${u} .forEach(err => errors.push(Object.assign({ message: ${o}.messages[err.type], field }, err)));\n\t\t\t\t\t}\n\t\t\t\t`;
                const l = "res_" + o;
                return `\n\t\t\t\tconst ${o} = context.customs[${n}];\n\t\t\t\tconst ${l} = ${o}.schema.${e}.call(this, ${t}, ${o}.schema, "${i}", parent, context);\n\t\t\t\tif (Array.isArray(${l})) {\n\t\t\t\t\t${l}.forEach(err => errors.push(Object.assign({ message: ${o}.messages[err.type], field }, err)));\n\t\t\t\t}\n\t\t`;
              }
              return "";
            }
            add(t, e) {
              this.rules[t] = e;
            }
            addMessage(t, e) {
              this.messages[t] = e;
            }
            alias(t, e) {
              if (this.rules[t])
                throw new Error("Alias name must not be a rule name");
              this.aliases[t] = e;
            }
            plugin(t) {
              if ("function" != typeof t)
                throw new Error("Plugin fn type must be function");
              return t(this);
            }
          },
          Ne = "INUMBER",
          $e = "IOP1",
          Be = "IOP2",
          Le = "IOP3",
          Fe = "IVAR",
          Re = "IVARNAME",
          ze = "IFUNCALL",
          Ge = "IFUNDEF",
          qe = "IEXPR",
          Ke = "IEXPREVAL",
          Je = "IMEMBER",
          We = "IENDSTATEMENT",
          He = "IARRAY";
        function Ue(t, e) {
          (this.type = t), (this.value = null != e ? e : 0);
        }
        function Qe(t) {
          return new Ue($e, t);
        }
        function Xe(t) {
          return new Ue(Be, t);
        }
        function Ze(t) {
          return new Ue(Le, t);
        }
        function Ye(t, e, n, i, r) {
          for (var s, a, o, u, l = [], c = [], h = 0; h < t.length; h++) {
            var p = t[h],
              d = p.type;
            if (d === Ne || d === Re)
              Array.isArray(p.value)
                ? l.push.apply(
                    l,
                    Ye(
                      p.value
                        .map(function (t) {
                          return new Ue(Ne, t);
                        })
                        .concat(new Ue(He, p.value.length)),
                      e,
                      n,
                      i,
                      r
                    )
                  )
                : l.push(p);
            else if (d === Fe && r.hasOwnProperty(p.value))
              (p = new Ue(Ne, r[p.value])), l.push(p);
            else if (d === Be && l.length > 1)
              (a = l.pop()),
                (s = l.pop()),
                (u = n[p.value]),
                (p = new Ue(Ne, u(s.value, a.value))),
                l.push(p);
            else if (d === Le && l.length > 2)
              (o = l.pop()),
                (a = l.pop()),
                (s = l.pop()),
                "?" === p.value
                  ? l.push(s.value ? a.value : o.value)
                  : ((u = i[p.value]),
                    (p = new Ue(Ne, u(s.value, a.value, o.value))),
                    l.push(p));
            else if (d === $e && l.length > 0)
              (s = l.pop()),
                (u = e[p.value]),
                (p = new Ue(Ne, u(s.value))),
                l.push(p);
            else if (d === qe) {
              for (; l.length > 0; ) c.push(l.shift());
              c.push(new Ue(qe, Ye(p.value, e, n, i, r)));
            } else if (d === Je && l.length > 0)
              (s = l.pop()), l.push(new Ue(Ne, s.value[p.value]));
            else {
              for (; l.length > 0; ) c.push(l.shift());
              c.push(p);
            }
          }
          for (; l.length > 0; ) c.push(l.shift());
          return c;
        }
        function tn(t, e, n) {
          for (var i = [], r = 0; r < t.length; r++) {
            var s = t[r],
              a = s.type;
            if (a === Fe && s.value === e)
              for (var o = 0; o < n.tokens.length; o++) {
                var u,
                  l = n.tokens[o];
                (u =
                  l.type === $e
                    ? Qe(l.value)
                    : l.type === Be
                    ? Xe(l.value)
                    : l.type === Le
                    ? Ze(l.value)
                    : new Ue(l.type, l.value)),
                  i.push(u);
              }
            else a === qe ? i.push(new Ue(qe, tn(s.value, e, n))) : i.push(s);
          }
          return i;
        }
        function en(t, e, n) {
          var i,
            r,
            s,
            a,
            o,
            u,
            l = [];
          if (rn(t)) return sn(t, n);
          for (var c = t.length, h = 0; h < c; h++) {
            var p = t[h],
              d = p.type;
            if (d === Ne || d === Re) l.push(p.value);
            else if (d === Be)
              (r = l.pop()),
                (i = l.pop()),
                "and" === p.value
                  ? l.push(!!i && !!en(r, e, n))
                  : "or" === p.value
                  ? l.push(!!i || !!en(r, e, n))
                  : "=" === p.value
                  ? ((a = e.binaryOps[p.value]), l.push(a(i, en(r, e, n), n)))
                  : ((a = e.binaryOps[p.value]), l.push(a(sn(i, n), sn(r, n))));
            else if (d === Le)
              (s = l.pop()),
                (r = l.pop()),
                (i = l.pop()),
                "?" === p.value
                  ? l.push(en(i ? r : s, e, n))
                  : ((a = e.ternaryOps[p.value]),
                    l.push(a(sn(i, n), sn(r, n), sn(s, n))));
            else if (d === Fe)
              if (p.value in e.functions) l.push(e.functions[p.value]);
              else if (
                p.value in e.unaryOps &&
                e.parser.isOperatorEnabled(p.value)
              )
                l.push(e.unaryOps[p.value]);
              else {
                var f = n[p.value];
                if (void 0 === f)
                  throw new Error("undefined variable: " + p.value);
                l.push(f);
              }
            else if (d === $e)
              (i = l.pop()), (a = e.unaryOps[p.value]), l.push(a(sn(i, n)));
            else if (d === ze) {
              for (u = p.value, o = []; u-- > 0; ) o.unshift(sn(l.pop(), n));
              if (!(a = l.pop()).apply || !a.call)
                throw new Error(a + " is not a function");
              l.push(a.apply(void 0, o));
            } else if (d === Ge)
              l.push(
                (function () {
                  for (var t = l.pop(), i = [], r = p.value; r-- > 0; )
                    i.unshift(l.pop());
                  var s = l.pop(),
                    a = function () {
                      for (
                        var r = Object.assign({}, n), s = 0, a = i.length;
                        s < a;
                        s++
                      )
                        r[i[s]] = arguments[s];
                      return en(t, e, r);
                    };
                  return (
                    Object.defineProperty(a, "name", {
                      value: s,
                      writable: !1,
                    }),
                    (n[s] = a),
                    a
                  );
                })()
              );
            else if (d === qe) l.push(nn(p, e));
            else if (d === Ke) l.push(p);
            else if (d === Je) (i = l.pop()), l.push(i[p.value]);
            else if (d === We) l.pop();
            else {
              if (d !== He) throw new Error("invalid Expression");
              for (u = p.value, o = []; u-- > 0; ) o.unshift(l.pop());
              l.push(o);
            }
          }
          if (l.length > 1) throw new Error("invalid Expression (parity)");
          return 0 === l[0] ? 0 : sn(l[0], n);
        }
        function nn(t, e, n) {
          return rn(t)
            ? t
            : {
                type: Ke,
                value: function (n) {
                  return en(t.value, e, n);
                },
              };
        }
        function rn(t) {
          return t && t.type === Ke;
        }
        function sn(t, e) {
          return rn(t) ? t.value(e) : t;
        }
        function an(t, e) {
          for (var n, i, r, s, a, o, u = [], l = 0; l < t.length; l++) {
            var c = t[l],
              h = c.type;
            if (h === Ne)
              "number" == typeof c.value && c.value < 0
                ? u.push("(" + c.value + ")")
                : Array.isArray(c.value)
                ? u.push("[" + c.value.map(on).join(", ") + "]")
                : u.push(on(c.value));
            else if (h === Be)
              (i = u.pop()),
                (n = u.pop()),
                (s = c.value),
                e
                  ? "^" === s
                    ? u.push("Math.pow(" + n + ", " + i + ")")
                    : "and" === s
                    ? u.push("(!!" + n + " && !!" + i + ")")
                    : "or" === s
                    ? u.push("(!!" + n + " || !!" + i + ")")
                    : "||" === s
                    ? u.push(
                        "(function(a,b){ return Array.isArray(a) && Array.isArray(b) ? a.concat(b) : String(a) + String(b); }((" +
                          n +
                          "),(" +
                          i +
                          ")))"
                      )
                    : "==" === s
                    ? u.push("(" + n + " === " + i + ")")
                    : "!=" === s
                    ? u.push("(" + n + " !== " + i + ")")
                    : "[" === s
                    ? u.push(n + "[(" + i + ") | 0]")
                    : u.push("(" + n + " " + s + " " + i + ")")
                  : "[" === s
                  ? u.push(n + "[" + i + "]")
                  : u.push("(" + n + " " + s + " " + i + ")");
            else if (h === Le) {
              if (
                ((r = u.pop()),
                (i = u.pop()),
                (n = u.pop()),
                "?" !== (s = c.value))
              )
                throw new Error("invalid Expression");
              u.push("(" + n + " ? " + i + " : " + r + ")");
            } else if (h === Fe || h === Re) u.push(c.value);
            else if (h === $e)
              (n = u.pop()),
                "-" === (s = c.value) || "+" === s
                  ? u.push("(" + s + n + ")")
                  : e
                  ? "not" === s
                    ? u.push("(!" + n + ")")
                    : "!" === s
                    ? u.push("fac(" + n + ")")
                    : u.push(s + "(" + n + ")")
                  : "!" === s
                  ? u.push("(" + n + "!)")
                  : u.push("(" + s + " " + n + ")");
            else if (h === ze) {
              for (o = c.value, a = []; o-- > 0; ) a.unshift(u.pop());
              (s = u.pop()), u.push(s + "(" + a.join(", ") + ")");
            } else if (h === Ge) {
              for (i = u.pop(), o = c.value, a = []; o-- > 0; )
                a.unshift(u.pop());
              (n = u.pop()),
                e
                  ? u.push(
                      "(" +
                        n +
                        " = function(" +
                        a.join(", ") +
                        ") { return " +
                        i +
                        " })"
                    )
                  : u.push("(" + n + "(" + a.join(", ") + ") = " + i + ")");
            } else if (h === Je) (n = u.pop()), u.push(n + "." + c.value);
            else if (h === He) {
              for (o = c.value, a = []; o-- > 0; ) a.unshift(u.pop());
              u.push("[" + a.join(", ") + "]");
            } else if (h === qe) u.push("(" + an(c.value, e) + ")");
            else if (h !== We) throw new Error("invalid Expression");
          }
          return (
            u.length > 1 && (u = e ? [u.join(",")] : [u.join(";")]),
            String(u[0])
          );
        }
        function on(t) {
          return "string" == typeof t
            ? JSON.stringify(t)
                .replace(/\u2028/g, "\\u2028")
                .replace(/\u2029/g, "\\u2029")
            : t;
        }
        function un(t, e) {
          for (var n = 0; n < t.length; n++) if (t[n] === e) return !0;
          return !1;
        }
        function ln(t, e, n) {
          for (
            var i = !!(n = n || {}).withMembers, r = null, s = 0;
            s < t.length;
            s++
          ) {
            var a = t[s];
            a.type === Fe || a.type === Re
              ? i || un(e, a.value)
                ? null !== r
                  ? (un(e, r) || e.push(r), (r = a.value))
                  : (r = a.value)
                : e.push(a.value)
              : a.type === Je && i && null !== r
              ? (r += "." + a.value)
              : a.type === qe
              ? ln(a.value, e, n)
              : null !== r && (un(e, r) || e.push(r), (r = null));
          }
          null === r || un(e, r) || e.push(r);
        }
        function cn(t, e) {
          (this.tokens = t),
            (this.parser = e),
            (this.unaryOps = e.unaryOps),
            (this.binaryOps = e.binaryOps),
            (this.ternaryOps = e.ternaryOps),
            (this.functions = e.functions);
        }
        (Ue.prototype.toString = function () {
          switch (this.type) {
            case Ne:
            case $e:
            case Be:
            case Le:
            case Fe:
            case Re:
            case We:
              return this.value;
            case ze:
              return "CALL " + this.value;
            case Ge:
              return "DEF " + this.value;
            case He:
              return "ARRAY " + this.value;
            case Je:
              return "." + this.value;
            default:
              return "Invalid Instruction";
          }
        }),
          (cn.prototype.simplify = function (t) {
            return (
              (t = t || {}),
              new cn(
                Ye(
                  this.tokens,
                  this.unaryOps,
                  this.binaryOps,
                  this.ternaryOps,
                  t
                ),
                this.parser
              )
            );
          }),
          (cn.prototype.substitute = function (t, e) {
            return (
              e instanceof cn || (e = this.parser.parse(String(e))),
              new cn(tn(this.tokens, t, e), this.parser)
            );
          }),
          (cn.prototype.evaluate = function (t) {
            return (t = t || {}), en(this.tokens, this, t);
          }),
          (cn.prototype.toString = function () {
            return an(this.tokens, !1);
          }),
          (cn.prototype.symbols = function (t) {
            t = t || {};
            var e = [];
            return ln(this.tokens, e, t), e;
          }),
          (cn.prototype.variables = function (t) {
            t = t || {};
            var e = [];
            ln(this.tokens, e, t);
            var n = this.functions;
            return e.filter(function (t) {
              return !(t in n);
            });
          }),
          (cn.prototype.toJSFunction = function (t, e) {
            var n = this,
              i = new Function(
                t,
                "with(this.functions) with (this.ternaryOps) with (this.binaryOps) with (this.unaryOps) { return " +
                  an(this.simplify(e).tokens, !0) +
                  "; }"
              );
            return function () {
              return i.apply(n, arguments);
            };
          });
        var hn = "TEOF",
          pn = "TOP",
          dn = "TNUMBER",
          fn = "TSTRING",
          mn = "TPAREN",
          vn = "TBRACKET",
          yn = "TCOMMA",
          gn = "TNAME",
          bn = "TSEMICOLON";
        function kn(t, e, n) {
          (this.type = t), (this.value = e), (this.index = n);
        }
        function xn(t, e) {
          (this.pos = 0),
            (this.current = null),
            (this.unaryOps = t.unaryOps),
            (this.binaryOps = t.binaryOps),
            (this.ternaryOps = t.ternaryOps),
            (this.consts = t.consts),
            (this.expression = e),
            (this.savedPosition = 0),
            (this.savedCurrent = null),
            (this.options = t.options),
            (this.parser = t);
        }
        (kn.prototype.toString = function () {
          return this.type + ": " + this.value;
        }),
          (xn.prototype.newToken = function (t, e, n) {
            return new kn(t, e, null != n ? n : this.pos);
          }),
          (xn.prototype.save = function () {
            (this.savedPosition = this.pos), (this.savedCurrent = this.current);
          }),
          (xn.prototype.restore = function () {
            (this.pos = this.savedPosition), (this.current = this.savedCurrent);
          }),
          (xn.prototype.next = function () {
            return this.pos >= this.expression.length
              ? this.newToken(hn, "EOF")
              : this.isWhitespace() || this.isComment()
              ? this.next()
              : this.isRadixInteger() ||
                this.isNumber() ||
                this.isOperator() ||
                this.isString() ||
                this.isParen() ||
                this.isBracket() ||
                this.isComma() ||
                this.isSemicolon() ||
                this.isNamedOp() ||
                this.isConst() ||
                this.isName()
              ? this.current
              : void this.parseError(
                  'Unknown character "' + this.expression.charAt(this.pos) + '"'
                );
          }),
          (xn.prototype.isString = function () {
            var t = !1,
              e = this.pos,
              n = this.expression.charAt(e);
            if ("'" === n || '"' === n)
              for (
                var i = this.expression.indexOf(n, e + 1);
                i >= 0 && this.pos < this.expression.length;

              ) {
                if (
                  ((this.pos = i + 1), "\\" !== this.expression.charAt(i - 1))
                ) {
                  var r = this.expression.substring(e + 1, i);
                  (this.current = this.newToken(fn, this.unescape(r), e)),
                    (t = !0);
                  break;
                }
                i = this.expression.indexOf(n, i + 1);
              }
            return t;
          }),
          (xn.prototype.isParen = function () {
            var t = this.expression.charAt(this.pos);
            return (
              ("(" === t || ")" === t) &&
              ((this.current = this.newToken(mn, t)), this.pos++, !0)
            );
          }),
          (xn.prototype.isBracket = function () {
            var t = this.expression.charAt(this.pos);
            return (
              !(("[" !== t && "]" !== t) || !this.isOperatorEnabled("[")) &&
              ((this.current = this.newToken(vn, t)), this.pos++, !0)
            );
          }),
          (xn.prototype.isComma = function () {
            return (
              "," === this.expression.charAt(this.pos) &&
              ((this.current = this.newToken(yn, ",")), this.pos++, !0)
            );
          }),
          (xn.prototype.isSemicolon = function () {
            return (
              ";" === this.expression.charAt(this.pos) &&
              ((this.current = this.newToken(bn, ";")), this.pos++, !0)
            );
          }),
          (xn.prototype.isConst = function () {
            for (var t = this.pos, e = t; e < this.expression.length; e++) {
              var n = this.expression.charAt(e);
              if (
                n.toUpperCase() === n.toLowerCase() &&
                (e === this.pos ||
                  ("_" !== n && "." !== n && (n < "0" || n > "9")))
              )
                break;
            }
            if (e > t) {
              var i = this.expression.substring(t, e);
              if (i in this.consts)
                return (
                  (this.current = this.newToken(dn, this.consts[i])),
                  (this.pos += i.length),
                  !0
                );
            }
            return !1;
          }),
          (xn.prototype.isNamedOp = function () {
            for (var t = this.pos, e = t; e < this.expression.length; e++) {
              var n = this.expression.charAt(e);
              if (
                n.toUpperCase() === n.toLowerCase() &&
                (e === this.pos || ("_" !== n && (n < "0" || n > "9")))
              )
                break;
            }
            if (e > t) {
              var i = this.expression.substring(t, e);
              if (
                this.isOperatorEnabled(i) &&
                (i in this.binaryOps ||
                  i in this.unaryOps ||
                  i in this.ternaryOps)
              )
                return (
                  (this.current = this.newToken(pn, i)),
                  (this.pos += i.length),
                  !0
                );
            }
            return !1;
          }),
          (xn.prototype.isName = function () {
            for (
              var t = this.pos, e = t, n = !1;
              e < this.expression.length;
              e++
            ) {
              var i = this.expression.charAt(e);
              if (i.toUpperCase() === i.toLowerCase()) {
                if (e === this.pos && ("$" === i || "_" === i)) {
                  "_" === i && (n = !0);
                  continue;
                }
                if (e === this.pos || !n || ("_" !== i && (i < "0" || i > "9")))
                  break;
              } else n = !0;
            }
            if (n) {
              var r = this.expression.substring(t, e);
              return (
                (this.current = this.newToken(gn, r)),
                (this.pos += r.length),
                !0
              );
            }
            return !1;
          }),
          (xn.prototype.isWhitespace = function () {
            for (
              var t = !1, e = this.expression.charAt(this.pos);
              !(
                (" " !== e && "\t" !== e && "\n" !== e && "\r" !== e) ||
                ((t = !0), this.pos++, this.pos >= this.expression.length)
              );

            )
              e = this.expression.charAt(this.pos);
            return t;
          });
        var wn = /^[0-9a-f]{4}$/i;
        function Cn(t, e, n) {
          (this.parser = t),
            (this.tokens = e),
            (this.current = null),
            (this.nextToken = null),
            this.next(),
            (this.savedCurrent = null),
            (this.savedNextToken = null),
            (this.allowMemberAccess = !1 !== n.allowMemberAccess);
        }
        (xn.prototype.unescape = function (t) {
          var e = t.indexOf("\\");
          if (e < 0) return t;
          for (var n = t.substring(0, e); e >= 0; ) {
            var i = t.charAt(++e);
            switch (i) {
              case "'":
                n += "'";
                break;
              case '"':
                n += '"';
                break;
              case "\\":
                n += "\\";
                break;
              case "/":
                n += "/";
                break;
              case "b":
                n += "\b";
                break;
              case "f":
                n += "\f";
                break;
              case "n":
                n += "\n";
                break;
              case "r":
                n += "\r";
                break;
              case "t":
                n += "\t";
                break;
              case "u":
                var r = t.substring(e + 1, e + 5);
                wn.test(r) ||
                  this.parseError("Illegal escape sequence: \\u" + r),
                  (n += String.fromCharCode(parseInt(r, 16))),
                  (e += 4);
                break;
              default:
                throw this.parseError('Illegal escape sequence: "\\' + i + '"');
            }
            ++e;
            var s = t.indexOf("\\", e);
            (n += t.substring(e, s < 0 ? t.length : s)), (e = s);
          }
          return n;
        }),
          (xn.prototype.isComment = function () {
            return (
              "/" === this.expression.charAt(this.pos) &&
              "*" === this.expression.charAt(this.pos + 1) &&
              ((this.pos = this.expression.indexOf("*/", this.pos) + 2),
              1 === this.pos && (this.pos = this.expression.length),
              !0)
            );
          }),
          (xn.prototype.isRadixInteger = function () {
            var t,
              e,
              n = this.pos;
            if (
              n >= this.expression.length - 2 ||
              "0" !== this.expression.charAt(n)
            )
              return !1;
            if ((++n, "x" === this.expression.charAt(n)))
              (t = 16), (e = /^[0-9a-f]$/i), ++n;
            else {
              if ("b" !== this.expression.charAt(n)) return !1;
              (t = 2), (e = /^[01]$/i), ++n;
            }
            for (var i = !1, r = n; n < this.expression.length; ) {
              var s = this.expression.charAt(n);
              if (!e.test(s)) break;
              n++, (i = !0);
            }
            return (
              i &&
                ((this.current = this.newToken(
                  dn,
                  parseInt(this.expression.substring(r, n), t)
                )),
                (this.pos = n)),
              i
            );
          }),
          (xn.prototype.isNumber = function () {
            for (
              var t, e = !1, n = this.pos, i = n, r = n, s = !1, a = !1;
              n < this.expression.length &&
              (((t = this.expression.charAt(n)) >= "0" && t <= "9") ||
                (!s && "." === t));

            )
              "." === t ? (s = !0) : (a = !0), n++, (e = a);
            if ((e && (r = n), "e" === t || "E" === t)) {
              n++;
              for (var o = !0, u = !1; n < this.expression.length; ) {
                if (
                  ((t = this.expression.charAt(n)),
                  !o || ("+" !== t && "-" !== t))
                ) {
                  if (!(t >= "0" && t <= "9")) break;
                  (u = !0), (o = !1);
                } else o = !1;
                n++;
              }
              u || (n = r);
            }
            return (
              e
                ? ((this.current = this.newToken(
                    dn,
                    parseFloat(this.expression.substring(i, n))
                  )),
                  (this.pos = n))
                : (this.pos = r),
              e
            );
          }),
          (xn.prototype.isOperator = function () {
            var t = this.pos,
              e = this.expression.charAt(this.pos);
            if (
              "+" === e ||
              "-" === e ||
              "*" === e ||
              "/" === e ||
              "%" === e ||
              "^" === e ||
              "?" === e ||
              ":" === e ||
              "." === e
            )
              this.current = this.newToken(pn, e);
            else if ("∙" === e || "•" === e)
              this.current = this.newToken(pn, "*");
            else if (">" === e)
              "=" === this.expression.charAt(this.pos + 1)
                ? ((this.current = this.newToken(pn, ">=")), this.pos++)
                : (this.current = this.newToken(pn, ">"));
            else if ("<" === e)
              "=" === this.expression.charAt(this.pos + 1)
                ? ((this.current = this.newToken(pn, "<=")), this.pos++)
                : (this.current = this.newToken(pn, "<"));
            else if ("|" === e) {
              if ("|" !== this.expression.charAt(this.pos + 1)) return !1;
              (this.current = this.newToken(pn, "||")), this.pos++;
            } else if ("=" === e)
              "=" === this.expression.charAt(this.pos + 1)
                ? ((this.current = this.newToken(pn, "==")), this.pos++)
                : (this.current = this.newToken(pn, e));
            else {
              if ("!" !== e) return !1;
              "=" === this.expression.charAt(this.pos + 1)
                ? ((this.current = this.newToken(pn, "!=")), this.pos++)
                : (this.current = this.newToken(pn, e));
            }
            return (
              this.pos++,
              !!this.isOperatorEnabled(this.current.value) ||
                ((this.pos = t), !1)
            );
          }),
          (xn.prototype.isOperatorEnabled = function (t) {
            return this.parser.isOperatorEnabled(t);
          }),
          (xn.prototype.getCoordinates = function () {
            var t,
              e = 0,
              n = -1;
            do {
              e++,
                (t = this.pos - n),
                (n = this.expression.indexOf("\n", n + 1));
            } while (n >= 0 && n < this.pos);
            return { line: e, column: t };
          }),
          (xn.prototype.parseError = function (t) {
            var e = this.getCoordinates();
            throw new Error(
              "parse error [" + e.line + ":" + e.column + "]: " + t
            );
          }),
          (Cn.prototype.next = function () {
            return (
              (this.current = this.nextToken),
              (this.nextToken = this.tokens.next())
            );
          }),
          (Cn.prototype.tokenMatches = function (t, e) {
            return (
              void 0 === e ||
              (Array.isArray(e)
                ? un(e, t.value)
                : "function" == typeof e
                ? e(t)
                : t.value === e)
            );
          }),
          (Cn.prototype.save = function () {
            (this.savedCurrent = this.current),
              (this.savedNextToken = this.nextToken),
              this.tokens.save();
          }),
          (Cn.prototype.restore = function () {
            this.tokens.restore(),
              (this.current = this.savedCurrent),
              (this.nextToken = this.savedNextToken);
          }),
          (Cn.prototype.accept = function (t, e) {
            return (
              !(
                this.nextToken.type !== t ||
                !this.tokenMatches(this.nextToken, e)
              ) && (this.next(), !0)
            );
          }),
          (Cn.prototype.expect = function (t, e) {
            if (!this.accept(t, e)) {
              var n = this.tokens.getCoordinates();
              throw new Error(
                "parse error [" +
                  n.line +
                  ":" +
                  n.column +
                  "]: Expected " +
                  (e || t)
              );
            }
          }),
          (Cn.prototype.parseAtom = function (t) {
            var e = this.tokens.unaryOps;
            if (
              this.accept(gn) ||
              this.accept(pn, function (t) {
                return t.value in e;
              })
            )
              t.push(new Ue(Fe, this.current.value));
            else if (this.accept(dn)) t.push(new Ue(Ne, this.current.value));
            else if (this.accept(fn)) t.push(new Ue(Ne, this.current.value));
            else if (this.accept(mn, "("))
              this.parseExpression(t), this.expect(mn, ")");
            else {
              if (!this.accept(vn, "["))
                throw new Error("unexpected " + this.nextToken);
              if (this.accept(vn, "]")) t.push(new Ue(He, 0));
              else {
                var n = this.parseArrayList(t);
                t.push(new Ue(He, n));
              }
            }
          }),
          (Cn.prototype.parseExpression = function (t) {
            var e = [];
            this.parseUntilEndStatement(t, e) ||
              (this.parseVariableAssignmentExpression(e),
              this.parseUntilEndStatement(t, e) || this.pushExpression(t, e));
          }),
          (Cn.prototype.pushExpression = function (t, e) {
            for (var n = 0, i = e.length; n < i; n++) t.push(e[n]);
          }),
          (Cn.prototype.parseUntilEndStatement = function (t, e) {
            return (
              !!this.accept(bn) &&
              (!this.nextToken ||
                this.nextToken.type === hn ||
                (this.nextToken.type === mn && ")" === this.nextToken.value) ||
                e.push(new Ue(We)),
              this.nextToken.type !== hn && this.parseExpression(e),
              t.push(new Ue(qe, e)),
              !0)
            );
          }),
          (Cn.prototype.parseArrayList = function (t) {
            for (var e = 0; !this.accept(vn, "]"); )
              for (this.parseExpression(t), ++e; this.accept(yn); )
                this.parseExpression(t), ++e;
            return e;
          }),
          (Cn.prototype.parseVariableAssignmentExpression = function (t) {
            for (this.parseConditionalExpression(t); this.accept(pn, "="); ) {
              var e = t.pop(),
                n = [],
                i = t.length - 1;
              if (e.type !== ze) {
                if (e.type !== Fe && e.type !== Je)
                  throw new Error("expected variable for assignment");
                this.parseVariableAssignmentExpression(n),
                  t.push(new Ue(Re, e.value)),
                  t.push(new Ue(qe, n)),
                  t.push(Xe("="));
              } else {
                if (!this.tokens.isOperatorEnabled("()="))
                  throw new Error("function definition is not permitted");
                for (var r = 0, s = e.value + 1; r < s; r++) {
                  var a = i - r;
                  t[a].type === Fe && (t[a] = new Ue(Re, t[a].value));
                }
                this.parseVariableAssignmentExpression(n),
                  t.push(new Ue(qe, n)),
                  t.push(new Ue(Ge, e.value));
              }
            }
          }),
          (Cn.prototype.parseConditionalExpression = function (t) {
            for (this.parseOrExpression(t); this.accept(pn, "?"); ) {
              var e = [],
                n = [];
              this.parseConditionalExpression(e),
                this.expect(pn, ":"),
                this.parseConditionalExpression(n),
                t.push(new Ue(qe, e)),
                t.push(new Ue(qe, n)),
                t.push(Ze("?"));
            }
          }),
          (Cn.prototype.parseOrExpression = function (t) {
            for (this.parseAndExpression(t); this.accept(pn, "or"); ) {
              var e = [];
              this.parseAndExpression(e),
                t.push(new Ue(qe, e)),
                t.push(Xe("or"));
            }
          }),
          (Cn.prototype.parseAndExpression = function (t) {
            for (this.parseComparison(t); this.accept(pn, "and"); ) {
              var e = [];
              this.parseComparison(e), t.push(new Ue(qe, e)), t.push(Xe("and"));
            }
          });
        var On = ["==", "!=", "<", "<=", ">=", ">", "in"];
        Cn.prototype.parseComparison = function (t) {
          for (this.parseAddSub(t); this.accept(pn, On); ) {
            var e = this.current;
            this.parseAddSub(t), t.push(Xe(e.value));
          }
        };
        var In = ["+", "-", "||"];
        Cn.prototype.parseAddSub = function (t) {
          for (this.parseTerm(t); this.accept(pn, In); ) {
            var e = this.current;
            this.parseTerm(t), t.push(Xe(e.value));
          }
        };
        var Pn = ["*", "/", "%"];
        function En(t, e) {
          return Number(t) + Number(e);
        }
        function An(t, e) {
          return t - e;
        }
        function _n(t, e) {
          return t * e;
        }
        function Dn(t, e) {
          return t / e;
        }
        function Tn(t, e) {
          return t % e;
        }
        function Sn(t, e) {
          return Array.isArray(t) && Array.isArray(e)
            ? t.concat(e)
            : "" + t + e;
        }
        function Mn(t, e) {
          return t === e;
        }
        function jn(t, e) {
          return t !== e;
        }
        function Vn(t, e) {
          return t > e;
        }
        function Nn(t, e) {
          return t < e;
        }
        function $n(t, e) {
          return t >= e;
        }
        function Bn(t, e) {
          return t <= e;
        }
        function Ln(t, e) {
          return Boolean(t && e);
        }
        function Fn(t, e) {
          return Boolean(t || e);
        }
        function Rn(t, e) {
          return un(e, t);
        }
        function zn(t) {
          return (Math.exp(t) - Math.exp(-t)) / 2;
        }
        function Gn(t) {
          return (Math.exp(t) + Math.exp(-t)) / 2;
        }
        function qn(t) {
          return t === 1 / 0
            ? 1
            : t === -1 / 0
            ? -1
            : (Math.exp(t) - Math.exp(-t)) / (Math.exp(t) + Math.exp(-t));
        }
        function Kn(t) {
          return t === -1 / 0 ? t : Math.log(t + Math.sqrt(t * t + 1));
        }
        function Jn(t) {
          return Math.log(t + Math.sqrt(t * t - 1));
        }
        function Wn(t) {
          return Math.log((1 + t) / (1 - t)) / 2;
        }
        function Hn(t) {
          return Math.log(t) * Math.LOG10E;
        }
        function Un(t) {
          return -t;
        }
        function Qn(t) {
          return !t;
        }
        function Xn(t) {
          return t < 0 ? Math.ceil(t) : Math.floor(t);
        }
        function Zn(t) {
          return Math.random() * (t || 1);
        }
        function Yn(t) {
          return ei(t + 1);
        }
        (Cn.prototype.parseTerm = function (t) {
          for (this.parseFactor(t); this.accept(pn, Pn); ) {
            var e = this.current;
            this.parseFactor(t), t.push(Xe(e.value));
          }
        }),
          (Cn.prototype.parseFactor = function (t) {
            var e = this.tokens.unaryOps;
            if (
              (this.save(),
              this.accept(pn, function (t) {
                return t.value in e;
              }))
            ) {
              if ("-" !== this.current.value && "+" !== this.current.value) {
                if (this.nextToken.type === mn && "(" === this.nextToken.value)
                  return this.restore(), void this.parseExponential(t);
                if (
                  this.nextToken.type === bn ||
                  this.nextToken.type === yn ||
                  this.nextToken.type === hn ||
                  (this.nextToken.type === mn && ")" === this.nextToken.value)
                )
                  return this.restore(), void this.parseAtom(t);
              }
              var n = this.current;
              this.parseFactor(t), t.push(Qe(n.value));
            } else this.parseExponential(t);
          }),
          (Cn.prototype.parseExponential = function (t) {
            for (this.parsePostfixExpression(t); this.accept(pn, "^"); )
              this.parseFactor(t), t.push(Xe("^"));
          }),
          (Cn.prototype.parsePostfixExpression = function (t) {
            for (this.parseFunctionCall(t); this.accept(pn, "!"); )
              t.push(Qe("!"));
          }),
          (Cn.prototype.parseFunctionCall = function (t) {
            var e = this.tokens.unaryOps;
            if (
              this.accept(pn, function (t) {
                return t.value in e;
              })
            ) {
              var n = this.current;
              this.parseAtom(t), t.push(Qe(n.value));
            } else
              for (this.parseMemberExpression(t); this.accept(mn, "("); )
                if (this.accept(mn, ")")) t.push(new Ue(ze, 0));
                else {
                  var i = this.parseArgumentList(t);
                  t.push(new Ue(ze, i));
                }
          }),
          (Cn.prototype.parseArgumentList = function (t) {
            for (var e = 0; !this.accept(mn, ")"); )
              for (this.parseExpression(t), ++e; this.accept(yn); )
                this.parseExpression(t), ++e;
            return e;
          }),
          (Cn.prototype.parseMemberExpression = function (t) {
            for (
              this.parseAtom(t);
              this.accept(pn, ".") || this.accept(vn, "[");

            ) {
              var e = this.current;
              if ("." === e.value) {
                if (!this.allowMemberAccess)
                  throw new Error(
                    'unexpected ".", member access is not permitted'
                  );
                this.expect(gn), t.push(new Ue(Je, this.current.value));
              } else {
                if ("[" !== e.value)
                  throw new Error("unexpected symbol: " + e.value);
                if (!this.tokens.isOperatorEnabled("["))
                  throw new Error('unexpected "[]", arrays are disabled');
                this.parseExpression(t), this.expect(vn, "]"), t.push(Xe("["));
              }
            }
          });
        var ti = [
          0.9999999999999971,
          57.15623566586292,
          -59.59796035547549,
          14.136097974741746,
          -0.4919138160976202,
          3399464998481189e-20,
          4652362892704858e-20,
          -9837447530487956e-20,
          0.0001580887032249125,
          -0.00021026444172410488,
          0.00021743961811521265,
          -0.0001643181065367639,
          8441822398385275e-20,
          -26190838401581408e-21,
          36899182659531625e-22,
        ];
        function ei(t) {
          var e, n;
          if (
            (function (t) {
              return isFinite(t) && t === Math.round(t);
            })(t)
          ) {
            if (t <= 0) return isFinite(t) ? 1 / 0 : NaN;
            if (t > 171) return 1 / 0;
            for (var i = t - 2, r = t - 1; i > 1; ) (r *= i), i--;
            return 0 === r && (r = 1), r;
          }
          if (t < 0.5) return Math.PI / (Math.sin(Math.PI * t) * ei(1 - t));
          if (t >= 171.35) return 1 / 0;
          if (t > 85) {
            var s = t * t,
              a = s * t,
              o = a * t,
              u = o * t;
            return (
              Math.sqrt((2 * Math.PI) / t) *
              Math.pow(t / Math.E, t) *
              (1 +
                1 / (12 * t) +
                1 / (288 * s) -
                139 / (51840 * a) -
                571 / (2488320 * o) +
                163879 / (209018880 * u) +
                5246819 / (75246796800 * u * t))
            );
          }
          --t, (n = ti[0]);
          for (var l = 1; l < ti.length; ++l) n += ti[l] / (t + l);
          return (
            (e = t + 4.7421875 + 0.5),
            Math.sqrt(2 * Math.PI) * Math.pow(e, t + 0.5) * Math.exp(-e) * n
          );
        }
        function ni(t) {
          return Array.isArray(t) ? t.length : String(t).length;
        }
        function ii() {
          for (var t = 0, e = 0, n = 0; n < arguments.length; n++) {
            var i,
              r = Math.abs(arguments[n]);
            e < r
              ? ((t = t * (i = e / r) * i + 1), (e = r))
              : (t += r > 0 ? (i = r / e) * i : r);
          }
          return e === 1 / 0 ? 1 / 0 : e * Math.sqrt(t);
        }
        function ri(t, e, n) {
          return t ? e : n;
        }
        function si(t, e) {
          return void 0 === e || 0 == +e
            ? Math.round(t)
            : ((t = +t),
              (e = -+e),
              isNaN(t) || "number" != typeof e || e % 1 != 0
                ? NaN
                : ((t = t.toString().split("e")),
                  +(
                    (t = (t = Math.round(
                      +(t[0] + "e" + (t[1] ? +t[1] - e : -e))
                    ))
                      .toString()
                      .split("e"))[0] +
                    "e" +
                    (t[1] ? +t[1] + e : e)
                  )));
        }
        function ai(t, e, n) {
          return n && (n[t] = e), e;
        }
        function oi(t, e) {
          return t[0 | e];
        }
        function ui(t) {
          return 1 === arguments.length && Array.isArray(t)
            ? Math.max.apply(Math, t)
            : Math.max.apply(Math, arguments);
        }
        function li(t) {
          return 1 === arguments.length && Array.isArray(t)
            ? Math.min.apply(Math, t)
            : Math.min.apply(Math, arguments);
        }
        function ci(t, e) {
          if ("function" != typeof t)
            throw new Error("First argument to map is not a function");
          if (!Array.isArray(e))
            throw new Error("Second argument to map is not an array");
          return e.map(function (e, n) {
            return t(e, n);
          });
        }
        function hi(t, e, n) {
          if ("function" != typeof t)
            throw new Error("First argument to fold is not a function");
          if (!Array.isArray(n))
            throw new Error("Second argument to fold is not an array");
          return n.reduce(function (e, n, i) {
            return t(e, n, i);
          }, e);
        }
        function pi(t, e) {
          if ("function" != typeof t)
            throw new Error("First argument to filter is not a function");
          if (!Array.isArray(e))
            throw new Error("Second argument to filter is not an array");
          return e.filter(function (e, n) {
            return t(e, n);
          });
        }
        function di(t, e) {
          if (!Array.isArray(e) && "string" != typeof e)
            throw new Error(
              "Second argument to indexOf is not a string or array"
            );
          return e.indexOf(t);
        }
        function fi(t, e) {
          if (!Array.isArray(e))
            throw new Error("Second argument to join is not an array");
          return e.join(t);
        }
        function mi(t) {
          return (t > 0) - (t < 0) || +t;
        }
        var vi = 1 / 3;
        function yi(t) {
          return t < 0 ? -Math.pow(-t, vi) : Math.pow(t, vi);
        }
        function gi(t) {
          return Math.exp(t) - 1;
        }
        function bi(t) {
          return Math.log(1 + t);
        }
        function ki(t) {
          return Math.log(t) / Math.LN2;
        }
        function xi(t) {
          (this.options = t || {}),
            (this.unaryOps = {
              sin: Math.sin,
              cos: Math.cos,
              tan: Math.tan,
              asin: Math.asin,
              acos: Math.acos,
              atan: Math.atan,
              sinh: Math.sinh || zn,
              cosh: Math.cosh || Gn,
              tanh: Math.tanh || qn,
              asinh: Math.asinh || Kn,
              acosh: Math.acosh || Jn,
              atanh: Math.atanh || Wn,
              sqrt: Math.sqrt,
              cbrt: Math.cbrt || yi,
              log: Math.log,
              log2: Math.log2 || ki,
              ln: Math.log,
              lg: Math.log10 || Hn,
              log10: Math.log10 || Hn,
              expm1: Math.expm1 || gi,
              log1p: Math.log1p || bi,
              abs: Math.abs,
              ceil: Math.ceil,
              floor: Math.floor,
              round: Math.round,
              trunc: Math.trunc || Xn,
              "-": Un,
              "+": Number,
              exp: Math.exp,
              not: Qn,
              length: ni,
              "!": Yn,
              sign: Math.sign || mi,
            }),
            (this.binaryOps = {
              "+": En,
              "-": An,
              "*": _n,
              "/": Dn,
              "%": Tn,
              "^": Math.pow,
              "||": Sn,
              "==": Mn,
              "!=": jn,
              ">": Vn,
              "<": Nn,
              ">=": $n,
              "<=": Bn,
              and: Ln,
              or: Fn,
              in: Rn,
              "=": ai,
              "[": oi,
            }),
            (this.ternaryOps = { "?": ri }),
            (this.functions = {
              random: Zn,
              fac: Yn,
              min: li,
              max: ui,
              hypot: Math.hypot || ii,
              pyt: Math.hypot || ii,
              pow: Math.pow,
              atan2: Math.atan2,
              if: ri,
              gamma: ei,
              roundTo: si,
              map: ci,
              fold: hi,
              filter: pi,
              indexOf: di,
              join: fi,
            }),
            (this.consts = { E: Math.E, PI: Math.PI, true: !0, false: !1 });
        }
        (xi.prototype.parse = function (t) {
          var e = [],
            n = new Cn(this, new xn(this, t), {
              allowMemberAccess: this.options.allowMemberAccess,
            });
          return n.parseExpression(e), n.expect(hn, "EOF"), new cn(e, this);
        }),
          (xi.prototype.evaluate = function (t, e) {
            return this.parse(t).evaluate(e);
          });
        var wi = new xi();
        (xi.parse = function (t) {
          return wi.parse(t);
        }),
          (xi.evaluate = function (t, e) {
            return wi.parse(t).evaluate(e);
          });
        var Ci = {
          "+": "add",
          "-": "subtract",
          "*": "multiply",
          "/": "divide",
          "%": "remainder",
          "^": "power",
          "!": "factorial",
          "<": "comparison",
          ">": "comparison",
          "<=": "comparison",
          ">=": "comparison",
          "==": "comparison",
          "!=": "comparison",
          "||": "concatenate",
          and: "logical",
          or: "logical",
          not: "logical",
          "?": "conditional",
          ":": "conditional",
          "=": "assignment",
          "[": "array",
          "()=": "fndef",
        };
        xi.prototype.isOperatorEnabled = function (t) {
          var e = (function (t) {
              return Ci.hasOwnProperty(t) ? Ci[t] : t;
            })(t),
            n = this.options.operators || {};
          return !(e in n) || !!n[e];
        };
        var Oi = function (t) {
            t = t.replace(/ /g, "");
            var e = /\(([^\(\)]|\(([^\(\)]|\(([^\(\)]|\(([^\(\)])*\))*\))*\))*\)/.exec(
              t
            );
            if (void 0 === e) return { result: !1 };
            var n = t.split(")");
            return { result: !0, unit: n[n.length - 1], expression: e[0] };
          },
          Ii = (function () {
            function t(e) {
              o(this, t), (this.expressionProps = e);
            }
            return (
              l(t, [
                {
                  key: "resize",
                  value: function (t) {
                    var e = Oi(this.expressionProps.expression),
                      n = "(".concat(e.expression, "*").concat(t, ")");
                    return ""
                      .concat(G.mathExpPreface, "(")
                      .concat(n, ")")
                      .concat(this.expressionProps.unit);
                  },
                },
                {
                  key: "calculateValues",
                  value: function (t, e) {
                    for (
                      var n,
                        i = t.length,
                        r = new xi().parse(this.expressionProps.expression),
                        s = [],
                        a =
                          (c((n = {}), G.totalElements, i),
                          c(n, G.initParams, e),
                          n),
                        o = 0;
                      o < i;
                      o++
                    ) {
                      a[G.elementIndex] = o;
                      try {
                        var u = r.evaluate(a);
                        if (null == u) {
                          ot.error(
                            "".concat(
                              this.expressionProps.expression,
                              " is not a valid mathematical expression. Returning 0"
                            )
                          ),
                            s.push(0);
                          continue;
                        }
                        var l = "".concat(u).concat(this.expressionProps.unit);
                        "amount" === this.expressionProps.type &&
                          (l = parseFloat(l)),
                          s.push(l);
                      } catch (t) {
                        ot.error(
                          "".concat(
                            this.expressionProps.expression,
                            " is not a valid mathematical expression. Returning 0"
                          )
                        ),
                          s.push(0);
                      }
                    }
                    return s;
                  },
                },
              ]),
              t
            );
          })();
        function Pi(t) {
          t = t.replace(/ /g, "");
          return /^@stagger\(([_A-z0-9.%-]+?(,[_A-z0-9.%-]+)?(,[_A-z0-9.%-]+)?(,[_A-z0-9.%-]+)?(,[_A-z0-9.%-]+)?(,[_A-z0-9.%-]+))\)$/.test(
            t
          );
        }
        var Ei = function (t) {
          var e =
            !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
          if (((t = t.replace(/ /g, "")), e && !Pi(t))) return !1;
          var n = /.*\((.*)\).*/,
            i = n.exec(t)[1],
            r = i.split(",");
          return {
            start: r[0],
            end: r[1],
            startFraction: 1 * r[2] || 0,
            easing: r[3] || "linear",
            mode: r[4] || "linear",
            reverse: "true" === r[5],
          };
        };
        var Ai = (function () {
            function t(e) {
              o(this, t), (this.staggerProps = e);
            }
            return (
              l(t, [
                {
                  key: "resize",
                  value: function (t) {
                    return (
                      (this.staggerProps.from *= t),
                      (this.staggerProps.to *= t),
                      !0 === this.staggerProps.integer &&
                        ((this.staggerProps.from = Math.round(
                          this.staggerProps.from
                        )),
                        (this.staggerProps.to = Math.round(
                          this.staggerProps.to
                        ))),
                      "@stagger("
                        .concat(this.staggerProps.from)
                        .concat(this.staggerProps.unit, ", ")
                        .concat(this.staggerProps.to)
                        .concat(this.staggerProps.unit, ", ")
                        .concat(this.staggerProps.fraction || 0, ", ")
                        .concat(this.staggerProps.easing || "linear", ", ")
                        .concat(this.staggerProps.mode || "linear", ", ")
                        .concat(this.staggerProps.reverse || !1, ")")
                    );
                  },
                },
                {
                  key: "calculateValues",
                  value: function (t) {
                    for (
                      var e,
                        n,
                        i,
                        r,
                        s = (function (t) {
                          var e =
                              arguments.length > 1 && void 0 !== arguments[1]
                                ? arguments[1]
                                : 0,
                            n =
                              arguments.length > 2 && void 0 !== arguments[2]
                                ? arguments[2]
                                : "linear",
                            i =
                              arguments.length > 3 &&
                              void 0 !== arguments[3] &&
                              arguments[3],
                            r = [];
                          if ("linear" === n)
                            for (var s = 0; s < t; s++) {
                              var a = s / (t - 1),
                                o = a < e ? a + 1 - e + 1 / (t - 1) : a - e;
                              i && (o = 1 - o), r.push(o);
                            }
                          else if ("omni" === n)
                            for (var u = 1 - e, l = 0; l < t; l++) {
                              var c = Math.abs(l / (t - 1) - e) / u;
                              i && (c = 1 - c), r.push(c);
                            }
                          return r;
                        })(
                          t.length,
                          this.staggerProps.fraction,
                          this.staggerProps.mode,
                          this.staggerProps.reverse
                        ),
                        a = [],
                        o = 0;
                      o < s.length;
                      o++
                    ) {
                      var u =
                        ((e = this.staggerProps.from),
                        (n = this.staggerProps.to),
                        (i = s[o]),
                        (r = this.staggerProps.easing) || (r = "linear"),
                        Vt[r](i) * (n - e) + e);
                      !0 === this.staggerProps.integer && (u = Math.round(u)),
                        "measurement" === this.staggerProps.type &&
                          (u += this.staggerProps.unit),
                        a.push(u);
                    }
                    return a;
                  },
                },
              ]),
              t
            );
          })(),
          _i = Pi,
          Di = new RegExp(
            /^#([\da-f]{3}){1,2}$|^#([\da-f]{4}){1,2}$|(rgb|hsl)a?\((\s*-?\d+%?\s*,){2}(\s*-?\d+%?\s*,?\s*\)?)(,\s*(0?\.\d+)?|1)?\)/,
            "gi"
          ),
          Ti = new RegExp(/^[-+]?\d+$/),
          Si = new Ve({
            messages: {
              color:
                "The '{field}' field must be an a valid color! Actual: {actual}",
              measurement:
                "The '{field}' must be a measurement with specs that are not met. You've either provided wrong value/units or an invalid @ expression. Actual: {actual}",
            },
          });
        Si.add("amount", function (t, e, n) {
          var i = t.schema;
          return (
            t.messages,
            {
              source: "\n      let startUnits, endUnits, startNumberPart, endNumberPart;\n      const staggerValidation = "
                .concat(_i, ";\n      const staggerAnalyser = ")
                .concat(Ei, ';\n      const easingKeys = "')
                .concat(
                  Object.keys(Vt).join(","),
                  "\".split(','); // todo check for simpler expression\n      const validateExpression = "
                )
                .concat(Oi, ";\n      const attributeRegexp = /^")
                .concat(
                  G.attibuteValue,
                  "\\([_A-z0-9-]*\\)$/;\n      const patternRegexp = /^"
                )
                .concat(
                  G.patternValue,
                  "\\(([_A-z0-9.%-]+?(,[_A-z0-9.%-]+)*?)\\)$/;\n      const extractParenthesisAttrsAsArray = "
                )
                .concat(
                  tt,
                  ";\n\n      function isNumeric(n) {\n        return !isNaN(parseFloat(n)) && isFinite(n);\n      }\n\n      if(typeof value === 'string' || value instanceof String){\n        if(value.trim().startsWith('"
                )
                .concat(
                  G.staggerPreface,
                  "')){\n          const staggerValid = staggerValidation(value);\n          if(staggerValid === false){\n            "
                )
                .concat(
                  this.makeError({
                    type: "amount",
                    actual: "value",
                    messages: {
                      amount:
                        "The " + G.staggerPreface + " expression is invalid",
                    },
                  }),
                  ";\n            return;\n          } else {\n            const analysis = staggerAnalyser(value, false);\n            if(!isNumeric(analysis.start)){\n              "
                )
                .concat(
                  this.makeError({
                    type: "amount",
                    actual: "analysis.start",
                    messages: {
                      amount:
                        "The provided start " +
                        G.staggerPreface +
                        " value is invalid",
                    },
                  }),
                  ";\n              return;\n            } else {\n              startNumberPart = analysis.start*1;\n              if("
                )
                .concat(
                  Object.prototype.hasOwnProperty.call(i, "min"),
                  "){\n                if("
                )
                .concat(i.min, " > analysis.start){\n                  ")
                .concat(
                  this.makeError({
                    type: "amount",
                    actual: "analysis.start",
                    messages: {
                      amount:
                        "The provided start " +
                        G.staggerPreface +
                        " value is smaller than the minimum accepted value (" +
                        i.min +
                        ")",
                    },
                  }),
                  ";\n                  return;\n                }\n              }\n              if("
                )
                .concat(
                  Object.prototype.hasOwnProperty.call(i, "max"),
                  "){\n                if("
                )
                .concat(i.max, " < analysis.start){\n                  ")
                .concat(
                  this.makeError({
                    type: "amount",
                    actual: "analysis.start",
                    messages: {
                      amount:
                        "The provided start " +
                        G.staggerPreface +
                        " value is bigger than the maximum accepted value (" +
                        i.max +
                        ")",
                    },
                  }),
                  ";\n                  return;\n                }\n              }\n               if("
                )
                .concat(
                  Object.prototype.hasOwnProperty.call(i, "integer"),
                  "){\n                if(!analysis.start.match("
                )
                .concat(Ti, ")){\n                  ")
                .concat(
                  this.makeError({
                    type: "amount",
                    actual: "analysis.start",
                    messages: {
                      amount:
                        "The provided start " +
                        G.staggerPreface +
                        " value is not an integer",
                    },
                  }),
                  ";\n                  return;\n                }\n              }\n            }\n\n            if(!isNumeric(analysis.end)){\n              "
                )
                .concat(
                  this.makeError({
                    type: "amount",
                    actual: "analysis.end",
                    messages: {
                      amount:
                        "The provided end " +
                        G.staggerPreface +
                        " value is invalid",
                    },
                  }),
                  ";\n              return;\n            } else {\n              endNumberPart = analysis.end*1;\n              if("
                )
                .concat(
                  Object.prototype.hasOwnProperty.call(i, "min"),
                  "){\n                if("
                )
                .concat(i.min, " > analysis.end){\n                  ")
                .concat(
                  this.makeError({
                    type: "amount",
                    actual: "analysis.end",
                    messages: {
                      amount:
                        "The provided end " +
                        G.staggerPreface +
                        " value is smaller than the minimum accepted value (" +
                        i.min +
                        ")",
                    },
                  }),
                  ";\n                  return;\n                }\n              }\n              if("
                )
                .concat(
                  Object.prototype.hasOwnProperty.call(i, "max"),
                  "){\n                if("
                )
                .concat(i.max, " < analysis.end){\n                  ")
                .concat(
                  this.makeError({
                    type: "amount",
                    actual: "analysis.end",
                    messages: {
                      amount:
                        "The provided end " +
                        G.staggerPreface +
                        " value is bigger than the maximum accepted value (" +
                        i.max +
                        ")",
                    },
                  }),
                  ";\n                  return;\n                }\n              }\n               if("
                )
                .concat(
                  Object.prototype.hasOwnProperty.call(i, "integer"),
                  "){\n                if(!analysis.end.match("
                )
                .concat(Ti, ")){\n                  ")
                .concat(
                  this.makeError({
                    type: "amount",
                    actual: "analysis.end",
                    messages: {
                      amount:
                        "The provided end " +
                        G.staggerPreface +
                        " value is not an integer",
                    },
                  }),
                  ";\n                  return;\n                }\n              }\n            }\n\n            if(analysis.startFraction < 0 || analysis.startFraction > 1){\n              "
                )
                .concat(
                  this.makeError({
                    type: "amount",
                    actual: "analysis.startFraction",
                    messages: {
                      amount:
                        "The " +
                        G.staggerPreface +
                        " fraction must be a number >=0 and <=1",
                    },
                  }),
                  ";\n              return;\n            }\n\n            if(easingKeys.indexOf(analysis.easing) < 0){\n              "
                )
                .concat(
                  this.makeError({
                    type: "amount",
                    actual: "analysis.startFraction",
                    messages: {
                      amount:
                        "The provided " +
                        G.staggerPreface +
                        " easing is not recognised by the system",
                    },
                  }),
                  ";\n              return;\n            }\n\n            if(analysis.mode !== 'linear' && analysis.mode !== 'omni'){\n              "
                )
                .concat(
                  this.makeError({
                    type: "amount",
                    actual: "analysis.mode",
                    messages: {
                      amount:
                        G.staggerPreface +
                        " mode can only be either linear or omni",
                    },
                  }),
                  ";\n              return;\n            }\n\n            if(analysis.reverse !== true && analysis.reverse !== false){\n              "
                )
                .concat(
                  this.makeError({
                    type: "amount",
                    actual: "analysis.reverse",
                    messages: {
                      amount:
                        G.staggerPreface +
                        " reverse needs to be either true or false",
                    },
                  }),
                  ";\n              return;\n            }\n\n            return value;\n          }\n        } else if(value.trim().startsWith('"
                )
                .concat(
                  G.patternValue,
                  "')){\n          if(!patternRegexp.test(value.replace(/ /g, ''))){\n            "
                )
                .concat(
                  this.makeError({
                    type: "amount",
                    actual: "value",
                    messages: {
                      amount:
                        "The " + G.patternValue + " expression is invalid",
                    },
                  }),
                  ";\n            return;\n          }\n          const patternValues = extractParenthesisAttrsAsArray(value);\n          for(let i=0; i<patternValues.length; i++){\n            const valToCheck = patternValues[i];\n            if(!isNumeric(valToCheck)){\n              "
                )
                .concat(
                  this.makeError({
                    type: "amount",
                    actual: "valToCheck",
                    messages: { amount: "The provided value is not a number" },
                  }),
                  ";\n              return;\n            } else {\n              if("
                )
                .concat(
                  Object.prototype.hasOwnProperty.call(i, "min"),
                  "){\n                if("
                )
                .concat(i.min, " > valToCheck){\n                  ")
                .concat(
                  this.makeError({
                    type: "amount",
                    actual: "valToCheck",
                    messages: {
                      amount:
                        "The provided value is smaller than the minimum accepted value (" +
                        i.min +
                        ")",
                    },
                  }),
                  ";\n                  return;\n                }\n              }\n              if("
                )
                .concat(
                  Object.prototype.hasOwnProperty.call(i, "max"),
                  "){\n                if("
                )
                .concat(i.max, " < valToCheck){\n                  ")
                .concat(
                  this.makeError({
                    type: "amount",
                    actual: "valToCheck",
                    messages: {
                      amount:
                        "The provided start value is bigger than the maximum accepted value (" +
                        i.max +
                        ")",
                    },
                  }),
                  ";\n                  return;\n                }\n              }\n               if("
                )
                .concat(
                  Object.prototype.hasOwnProperty.call(i, "integer"),
                  "){\n                if(!valToCheck.match("
                )
                .concat(Ti, ")){\n                  ")
                .concat(
                  this.makeError({
                    type: "amount",
                    actual: "valToCheck",
                    messages: {
                      amount: "The provided value is not an integer",
                    },
                  }),
                  ";\n                  return;\n                }\n              }\n          }\n        }\n        return value;\n      }  else if(value.trim().startsWith('"
                )
                .concat(
                  G.attibuteValue,
                  "')){\n          if(!attributeRegexp.test(value)){\n            "
                )
                .concat(
                  this.makeError({
                    type: "amount",
                    actual: "value",
                    messages: {
                      amount:
                        "The " + G.attibuteValue + " expression is invalid",
                    },
                  }),
                  ";\n            return;\n          }\n\n          return value;\n        } else if(value.trim().startsWith('"
                )
                .concat(
                  G.mathExpPreface,
                  "')){\n          const validity = validateExpression(value);\n          if(validity.result === false){\n            "
                )
                .concat(
                  this.makeError({
                    type: "amount",
                    actual: "value",
                    messages: {
                      amount:
                        "The " + G.expressionPreface + " expression is invalid",
                    },
                  }),
                  ';\n            return;\n          } else {\n            if(validity.unit !== ""){\n              '
                )
                .concat(
                  this.makeError({
                    type: "amount",
                    actual: "value",
                    messages: {
                      amount:
                        "The " +
                        G.expressionPreface +
                        " expression includes units",
                    },
                  }),
                  ";\n              return;\n            }\n\n            return value;\n          }\n        }\n      }\n\n\n      if(typeof value !== 'number'){\n        "
                )
                .concat(
                  this.makeError({
                    type: "amount",
                    actual: "value",
                    messages: { amount: "The provided value is not a number" },
                  }),
                  ";\n        return;\n      }\n      if("
                )
                .concat(
                  Object.prototype.hasOwnProperty.call(i, "max"),
                  "){\n        if("
                )
                .concat(i.max, " < value){\n          ")
                .concat(
                  this.makeError({
                    type: "amount",
                    actual: "value",
                    messages: {
                      amount:
                        "The provided amount is bigger than the maximum accepted value",
                    },
                  }),
                  ";\n          return;\n        }\n      }\n      if("
                )
                .concat(
                  Object.prototype.hasOwnProperty.call(i, "min"),
                  "){\n        if("
                )
                .concat(i.min, " > value){\n          ")
                .concat(
                  this.makeError({
                    type: "amount",
                    actual: "value",
                    messages: {
                      amount:
                        "The provided amount is lower than the minimum accepted value",
                    },
                  }),
                  ";\n          return;\n        }\n      }\n      if("
                )
                .concat(
                  Object.prototype.hasOwnProperty.call(i, "integer"),
                  "){\n        if(value !== parseInt(value, 10)){\n          "
                )
                .concat(
                  this.makeError({
                    type: "amount",
                    actual: "value",
                    messages: {
                      amount: "The provided amount is not an integer",
                    },
                  }),
                  ";\n          return;\n        }\n      }\n      return value;\n\n    "
                ),
            }
          );
        }),
          Si.add("measurement", function (t, e, n) {
            var i = t.schema,
              r = t.messages,
              s = new RegExp(
                "^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)(" +
                  i.units.join("|") +
                  ")$",
                "gi"
              ),
              a = new RegExp("^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)", "gi");
            return {
              source: "\n      let startUnits, endUnits, startNumberPart, endNumberPart;\n      const staggerValidation = "
                .concat(_i, ";\n      const staggerAnalyser = ")
                .concat(Ei, ';\n      const easingKeys = "')
                .concat(
                  Object.keys(Vt).join(","),
                  "\".split(',');\n      const validateExpression = "
                )
                .concat(Oi, ";\n      const validUnits = ['")
                .concat(
                  i.units.join("','"),
                  "'];\n      const attributeRegexp = /^"
                )
                .concat(
                  G.attibuteValue,
                  "\\([_A-z0-9-]*\\)$/;\n      const patternRegexp = /^"
                )
                .concat(
                  G.patternValue,
                  "\\(([_A-z0-9.%-]+?(,[_A-z0-9.%-]+)*?)\\)$/;\n      const extractParenthesisAttrsAsArray = "
                )
                .concat(
                  tt,
                  ";\n\n      if(typeof value !== 'string' && !(value instanceof String)){\n        "
                )
                .concat(
                  this.makeError({
                    type: "measurement",
                    actual: "value",
                    messages: r,
                  }),
                  "\n        return ;\n      }\n\n      if(value.trim().startsWith('"
                )
                .concat(
                  G.attibuteValue,
                  "')){\n        if(!attributeRegexp.test(value)){\n          "
                )
                .concat(
                  this.makeError({
                    type: "amount",
                    actual: "value",
                    messages: {
                      amount:
                        "The " + G.attibuteValue + " expression is invalid",
                    },
                  }),
                  ";\n          return;\n        }\n\n        return value;\n      } else if(value.trim().startsWith('"
                )
                .concat(
                  G.staggerPreface,
                  "')){\n        const staggerValid = staggerValidation(value);\n        if(staggerValid === false){\n          "
                )
                .concat(
                  this.makeError({
                    type: "measurement",
                    actual: "value",
                    messages: {
                      measurement:
                        "The " + G.staggerPreface + " expression is invalid",
                    },
                  }),
                  ";\n          return;\n        } else {\n          const analysis = staggerAnalyser(value, false);\n          if(!analysis.start.match("
                )
                .concat(s, ")){\n            ")
                .concat(
                  this.makeError({
                    type: "measurement",
                    actual: "analysis.start",
                    messages: {
                      measurement:
                        "The provided start " +
                        G.staggerPreface +
                        " value is invalid",
                    },
                  }),
                  ";\n            return;\n          } else {\n            var numberPart = analysis.start.match("
                )
                .concat(
                  a,
                  ")[0];\n            startNumberPart = numberPart;\n            startUnits = analysis.start.toString().substring(numberPart.length);\n            if("
                )
                .concat(
                  Object.prototype.hasOwnProperty.call(i, "min"),
                  "){\n              if("
                )
                .concat(i.min, " > numberPart){\n                ")
                .concat(
                  this.makeError({
                    type: "measurement",
                    actual: "analysis.start",
                    messages: {
                      measurement:
                        "The provided start " +
                        G.staggerPreface +
                        " value is smaller than the minimum accepted value (" +
                        i.min +
                        ")",
                    },
                  }),
                  ";\n                return;\n              }\n            }\n            if("
                )
                .concat(
                  Object.prototype.hasOwnProperty.call(i, "max"),
                  "){\n              if("
                )
                .concat(i.max, " < numberPart){\n                ")
                .concat(
                  this.makeError({
                    type: "measurement",
                    actual: "analysis.start",
                    messages: {
                      measurement:
                        "The provided start " +
                        G.staggerPreface +
                        " value is bigger than the maximum accepted value (" +
                        i.max +
                        ")",
                    },
                  }),
                  ";\n                return;\n              }\n            }\n             if("
                )
                .concat(
                  Object.prototype.hasOwnProperty.call(i, "integer"),
                  "){\n              if(!numberPart.match("
                )
                .concat(Ti, ")){\n                ")
                .concat(
                  this.makeError({
                    type: "measurement",
                    actual: "analysis.start",
                    messages: {
                      measurement:
                        "The provided start " +
                        G.staggerPreface +
                        " value is not an integer",
                    },
                  }),
                  ";\n                return;\n              }\n            }\n          }\n\n          if(!analysis.end.match("
                )
                .concat(s, ")){\n            ")
                .concat(
                  this.makeError({
                    type: "measurement",
                    actual: "analysis.end",
                    messages: {
                      measurement:
                        "The provided end " +
                        G.staggerPreface +
                        " value is invalid",
                    },
                  }),
                  ";\n            return;\n          } else {\n            var numberPart = analysis.end.match("
                )
                .concat(
                  a,
                  ")[0];\n            endNumberPart = numberPart;\n            endUnits = analysis.end.toString().substring(numberPart.length);\n            if("
                )
                .concat(
                  Object.prototype.hasOwnProperty.call(i, "min"),
                  "){\n              if("
                )
                .concat(i.min, " > numberPart){\n                ")
                .concat(
                  this.makeError({
                    type: "measurement",
                    actual: "analysis.end",
                    messages: {
                      measurement:
                        "The provided end " +
                        G.staggerPreface +
                        " value is smaller than the minimum accepted value (" +
                        i.min +
                        ")",
                    },
                  }),
                  ";\n                return;\n              }\n            }\n            if("
                )
                .concat(
                  Object.prototype.hasOwnProperty.call(i, "max"),
                  "){\n              if("
                )
                .concat(i.max, " < numberPart){\n                ")
                .concat(
                  this.makeError({
                    type: "measurement",
                    actual: "analysis.end",
                    messages: {
                      measurement:
                        "The provided end " +
                        G.staggerPreface +
                        " value is bigger than the maximum accepted value (" +
                        i.max +
                        ")",
                    },
                  }),
                  ";\n                return;\n              }\n            }\n             if("
                )
                .concat(
                  Object.prototype.hasOwnProperty.call(i, "integer"),
                  "){\n              if(!numberPart.match("
                )
                .concat(Ti, ")){\n                ")
                .concat(
                  this.makeError({
                    type: "measurement",
                    actual: "analysis.end",
                    messages: {
                      measurement:
                        "The provided end " +
                        G.staggerPreface +
                        " value is not an integer",
                    },
                  }),
                  ";\n                return;\n              }\n            }\n          }\n\n          if(startUnits !== endUnits){\n            "
                )
                .concat(
                  this.makeError({
                    type: "measurement",
                    actual: "analysis.startFraction",
                    messages: {
                      measurement:
                        "The " +
                        G.staggerPreface +
                        " start and end must always have the same units",
                    },
                  }),
                  ";\n            return;\n          }\n\n          if(analysis.startFraction < 0 || analysis.startFraction > 1){\n            "
                )
                .concat(
                  this.makeError({
                    type: "measurement",
                    actual: "analysis.startFraction",
                    messages: {
                      measurement:
                        "The " +
                        G.staggerPreface +
                        " fraction must be a number >=0 and <=1",
                    },
                  }),
                  ";\n            return;\n          }\n\n          if(easingKeys.indexOf(analysis.easing) < 0){\n            "
                )
                .concat(
                  this.makeError({
                    type: "measurement",
                    actual: "analysis.startFraction",
                    messages: {
                      measurement:
                        "The provided " +
                        G.staggerPreface +
                        " easing is not recognised by the system",
                    },
                  }),
                  ";\n            return;\n          }\n\n          if(analysis.mode !== 'linear' && analysis.mode !== 'omni'){\n            "
                )
                .concat(
                  this.makeError({
                    type: "measurement",
                    actual: "analysis.mode",
                    messages: {
                      measurement:
                        G.staggerPreface +
                        " mode can only be either linear or omni",
                    },
                  }),
                  ";\n            return;\n          }\n\n          if(analysis.reverse !== true && analysis.reverse !== false){\n            "
                )
                .concat(
                  this.makeError({
                    type: "measurement",
                    actual: "analysis.reverse",
                    messages: {
                      measurement:
                        G.staggerPreface +
                        " reverse needs to be either true or false",
                    },
                  }),
                  ";\n            return;\n          }\n\n          return value;\n        }\n      } else if(value.trim().startsWith('"
                )
                .concat(
                  G.patternValue,
                  "')){\n        if(!patternRegexp.test(value.replace(/ /g, ''))){\n          "
                )
                .concat(
                  this.makeError({
                    type: "amount",
                    actual: "value",
                    messages: {
                      amount:
                        "The " + G.patternValue + " expression is invalid",
                    },
                  }),
                  ";\n          return;\n        }\n        const patternValues = extractParenthesisAttrsAsArray(value);\n        for(let i=0; i<patternValues.length; i++){\n          const valToCheck = patternValues[i];\n          if(!valToCheck.match("
                )
                .concat(s, ")){\n            ")
                .concat(
                  this.makeError({
                    type: "measurement",
                    actual: "valToCheck",
                    messages: { measurement: "The provided value is invalid" },
                  }),
                  ";\n            return;\n          } else {\n            var numberPart = valToCheck.match("
                )
                .concat(a, ")[0];\n            if(")
                .concat(
                  Object.prototype.hasOwnProperty.call(i, "min"),
                  "){\n              if("
                )
                .concat(i.min, " > numberPart){\n                ")
                .concat(
                  this.makeError({
                    type: "measurement",
                    actual: "valToCheck",
                    messages: {
                      measurement:
                        "The provided value is smaller than the minimum accepted value (" +
                        i.min +
                        ")",
                    },
                  }),
                  ";\n                return;\n              }\n            }\n            if("
                )
                .concat(
                  Object.prototype.hasOwnProperty.call(i, "max"),
                  "){\n              if("
                )
                .concat(i.max, " < numberPart){\n                ")
                .concat(
                  this.makeError({
                    type: "measurement",
                    actual: "valToCheck",
                    messages: {
                      measurement:
                        "The provided value is bigger than the maximum accepted value (" +
                        i.max +
                        ")",
                    },
                  }),
                  ";\n                return;\n              }\n            }\n             if("
                )
                .concat(
                  Object.prototype.hasOwnProperty.call(i, "integer"),
                  "){\n              if(!numberPart.match("
                )
                .concat(Ti, ")){\n                ")
                .concat(
                  this.makeError({
                    type: "measurement",
                    actual: "valToCheck",
                    messages: {
                      measurement: "The provided value is not an integer",
                    },
                  }),
                  ";\n                return;\n              }\n            }\n          }\n        }\n        return value;\n      } else if(value.trim().startsWith('"
                )
                .concat(
                  G.mathExpPreface,
                  "')){\n          const validity = validateExpression(value);\n          if(validity.result === false){\n            "
                )
                .concat(
                  this.makeError({
                    type: "measurement",
                    actual: "value",
                    messages: {
                      measurement:
                        "The " + G.expressionPreface + " expression is invalid",
                    },
                  }),
                  ";\n            return;\n          } else {\n            if(validUnits.indexOf(validity.unit) < 0){\n              "
                )
                .concat(
                  this.makeError({
                    type: "measurement",
                    actual: "value",
                    messages: {
                      measurement:
                        "The " +
                        G.expressionPreface +
                        " expression has non-supported units",
                    },
                  }),
                  ";\n              return;\n            }\n\n            return value;\n          }\n        }\n\n\n      if(!value.match("
                )
                .concat(s, ")){\n        ")
                .concat(
                  this.makeError({
                    type: "measurement",
                    actual: "value",
                    messages: r,
                  }),
                  "\n      } else {\n        var numberPart = value.match("
                )
                .concat(a, ")[0];\n        if(")
                .concat(
                  Object.prototype.hasOwnProperty.call(i, "min"),
                  "){\n          if("
                )
                .concat(i.min, " > numberPart){\n            ")
                .concat(
                  this.makeError({
                    type: "measurement",
                    actual: "value",
                    messages: r,
                  }),
                  "\n          }\n        }\n        if("
                )
                .concat(
                  Object.prototype.hasOwnProperty.call(i, "max"),
                  "){\n          if("
                )
                .concat(i.max, " < numberPart){\n            ")
                .concat(
                  this.makeError({
                    type: "measurement",
                    actual: "value",
                    messages: r,
                  }),
                  "\n          }\n        }\n         if("
                )
                .concat(
                  Object.prototype.hasOwnProperty.call(i, "integer"),
                  "){\n          if(!numberPart.match("
                )
                .concat(Ti, ")){\n            ")
                .concat(
                  this.makeError({
                    type: "measurement",
                    actual: "value",
                    messages: r,
                  }),
                  "\n          }\n        }\n      }\n      return value;\n    "
                ),
            };
          }),
          Si.add("html", function (t, e, n) {
            t.schema;
            var i = t.messages;
            return {
              source: "\n      if(value === null){\n        ".concat(
                this.makeError({ type: "html", actual: "value", messages: i }),
                "\n      } else {\n        return value;\n      }\n    "
              ),
            };
          }),
          Si.add("css", function (t, e, n) {
            t.schema;
            var i = t.messages;
            return {
              source: "\n      if(value === null){\n        ".concat(
                this.makeError({ type: "css", actual: "value", messages: i }),
                "\n      } else {\n        return value;\n      }\n    "
              ),
            };
          }),
          Si.add("color", function (t, e, n) {
            t.schema;
            var i = t.messages;
            return {
              source: "\n      if(typeof value !== 'string' && !(value instanceof String)){\n        "
                .concat(
                  this.makeError({
                    type: "measurement",
                    actual: "value",
                    messages: i,
                  }),
                  "\n        return ;\n      }\n      if(!value.match("
                )
                .concat(
                  Di,
                  ') && [\n          "aliceblue",\n          "antiquewhite",\n          "aqua",\n          "aquamarine",\n          "azure",\n          "beige",\n          "bisque",\n          "black",\n          "blanchedalmond",\n          "blue",\n          "blueviolet",\n          "brown",\n          "burlywood",\n          "cadetblue",\n          "chartreuse",\n          "chocolate",\n          "coral",\n          "cornflowerblue",\n          "cornsilk",\n          "crimson",\n          "cyan",\n          "darkblue",\n          "darkcyan",\n          "darkgoldenrod",\n          "darkgray",\n          "darkgrey",\n          "darkgreen",\n          "darkkhaki",\n          "darkmagenta",\n          "darkolivegreen",\n          "darkorange",\n          "darkorchid",\n          "darkred",\n          "darksalmon",\n          "darkseagreen",\n          "darkslateblue",\n          "darkslategray",\n          "darkslategrey",\n          "darkturquoise",\n          "darkviolet",\n          "deeppink",\n          "deepskyblue",\n          "dimgray",\n          "dimgrey",\n          "dodgerblue",\n          "firebrick",\n          "floralwhite",\n          "forestgreen",\n          "fuchsia",\n          "gainsboro",\n          "ghostwhite",\n          "gold",\n          "goldenrod",\n          "gray",\n          "grey",\n          "green",\n          "greenyellow",\n          "honeydew",\n          "hotpink",\n          "indianred",\n          "indigo",\n          "ivory",\n          "khaki",\n          "lavender",\n          "lavenderblush",\n          "lawngreen",\n          "lemonchiffon",\n          "lightblue",\n          "lightcoral",\n          "lightcyan",\n          "lightgoldenrodyellow",\n          "lightgray",\n          "lightgrey",\n          "lightgreen",\n          "lightpink",\n          "lightsalmon",\n          "lightseagreen",\n          "lightskyblue",\n          "lightslategray",\n          "lightslategrey",\n          "lightsteelblue",\n          "lightyellow",\n          "lime",\n          "limegreen",\n          "linen",\n          "magenta",\n          "maroon",\n          "mediumaquamarine",\n          "mediumblue",\n          "mediumorchid",\n          "mediumpurple",\n          "mediumseagreen",\n          "mediumslateblue",\n          "mediumspringgreen",\n          "mediumturquoise",\n          "mediumvioletred",\n          "midnightblue",\n          "mintcream",\n          "mistyrose",\n          "moccasin",\n          "navajowhite",\n          "navy",\n          "oldlace",\n          "olive",\n          "olivedrab",\n          "orange",\n          "orangered",\n          "orchid",\n          "palegoldenrod",\n          "palegreen",\n          "paleturquoise",\n          "palevioletred",\n          "papayawhip",\n          "peachpuff",\n          "peru",\n          "pink",\n          "plum",\n          "powderblue",\n          "purple",\n          "rebeccapurple",\n          "red",\n          "rosybrown",\n          "royalblue",\n          "saddlebrown",\n          "salmon",\n          "sandybrown",\n          "seagreen",\n          "seashell",\n          "sienna",\n          "silver",\n          "skyblue",\n          "slateblue",\n          "slategray",\n          "slategrey",\n          "snow",\n          "springgreen",\n          "steelblue",\n          "tan",\n          "teal",\n          "thistle",\n          "tomato",\n          "turquoise",\n          "violet",\n          "wheat",\n          "white",\n          "whitesmoke",\n          "yellow",\n          "yellowgreen",\n        ].indexOf(value.toLowerCase()) < 0){\n        '
                )
                .concat(
                  this.makeError({
                    type: "color",
                    actual: "value",
                    messages: i,
                  }),
                  "\n      }\n      return value;\n    "
                ),
            };
          });
        var Mi = [
            "cm",
            "mm",
            "in",
            "px",
            "pt",
            "pc",
            "em",
            "ex",
            "ch",
            "rem",
            "vw",
            "vh",
            "vmin",
            "vmax",
            "%",
          ],
          ji = [
            {
              type: "string",
              optional: !0,
              default: "linear",
              enum: [
                "linear",
                "easeInQuad",
                "easeOutQuad",
                "easeInOutQuad",
                "easeInCubic",
                "easeOutCubic",
                "easeInOutCubic",
                "easeInQuart",
                "easeOutQuart",
                "easeInOutQuart",
                "easeInQuint",
                "easeOutQuint",
                "easeInOutQuint",
                "easeInSine",
                "easeOutSine",
                "easeInOutSine",
                "easeInExpo",
                "easeOutExpo",
                "easeInOutExpo",
                "easeInCirc",
                "easeOutCirc",
                "easeInOutCirc",
                "easeInElastic",
                "easeOutElastic",
                "easeInOutElastic",
                "easeInBack",
                "easeOutBack",
                "easeInOutBack",
                "easeInBounce",
                "easeOutBounce",
                "easeInOutBounce",
              ],
            },
            {
              type: "array",
              optional: !0,
              length: 4,
              items: { type: "number" },
            },
          ],
          Vi = { type: "string", empty: !1, trim: !0, optional: !0 },
          Ni = { type: "string", empty: !1, trim: !0, optional: !0 },
          $i = { type: "string", empty: !1, optional: !1 },
          Bi = { type: "amount", optional: !1, integer: !0, min: 0 },
          Li = { type: "amount", optional: !0, integer: !0, min: 0 },
          Fi = { type: "amount", integer: !0, min: 1, optional: !0 },
          Ri = { type: "amount", integer: !0, min: 0, optional: !0 },
          zi = { type: "amount", integer: !0, min: 0, optional: !0 },
          Gi = { type: "html", optional: !0 },
          qi = { type: "css", optional: !0 },
          Ki = {
            type: "array",
            optional: !0,
            items: { type: "object", props: { type: "string", src: "string" } },
          },
          Ji = {
            type: "array",
            items: {
              type: "object",
              strict: !0,
              props: {
                src: "string",
                id: "string",
                mcid: { type: "string", optional: !0 },
                classes: { type: "array", optional: !0, items: "string" },
                base64: { type: "boolean", optional: !0 },
                startValues: {
                  optional: !0,
                  type: "object",
                  props: {
                    gain: { optional: !0, type: "number" },
                    pan: { optional: !0, type: "number" },
                  },
                },
              },
            },
            optional: !0,
          },
          Wi = Si.compile({
            id: Vi,
            name: Ni,
            selector: p(p({}, $i), {}, { optional: !0 }),
            easing: ji,
            duration: Bi,
            startFrom: { type: "amount", integer: !0, min: 0, optional: !0 },
            repeats: Fi,
            hiatus: Ri,
            delay: zi,
          }),
          Hi = {
            type: "object",
            optional: !0,
            props: {
              width: { type: "measurement", units: Mi, optional: !0 },
              height: { type: "measurement", units: Mi, optional: !0 },
            },
          },
          Ui = { type: "string", enum: ["on", "off", "only"], optional: !0 },
          Qi = Si.compile({
            props: [
              {
                type: "object",
                strict: !0,
                props: {
                  id: Vi,
                  name: Ni,
                  selector: p(p({}, $i), {}, { optional: !0 }),
                  repeats: Fi,
                  hiatus: Ri,
                  delay: zi,
                  easing: ji,
                  duration: Li,
                  html: Gi,
                  css: qi,
                  audioSources: Ji,
                  audio: Ui,
                  containerParams: Hi,
                  fonts: Ki,
                  initParams: { type: "object", optional: !0 },
                },
              },
              {
                type: "object",
                strict: !0,
                props: {
                  id: Vi,
                  name: Ni,
                  host: { type: "any", optional: !1 },
                  duration: Li,
                  html: Gi,
                  css: qi,
                  audioSources: Ji,
                  audio: Ui,
                  containerParams: Hi,
                  fonts: Ki,
                  initParams: { type: "object", optional: !0 },
                },
              },
              {
                type: "object",
                strict: !0,
                props: {
                  root: { type: "boolean", optional: !0 },
                  name: Ni,
                  id: Vi,
                  audioSources: Ji,
                  audio: p(p({}, Ui), {}, { enum: ["on"] }),
                },
              },
            ],
          }),
          Xi = Si.compile({
            selector: p(p({}, $i), {}, { optional: !0, strict: !0 }),
            name: Ni,
          }),
          Zi = Si.compile({
            selector: p(p({}, $i), {}, { strict: !0, optional: !0 }),
            name: Ni,
            repeats: { type: "amount", integer: !0, min: 1, optional: !0 },
            hiatus: { type: "amount", integer: !0, min: 0, optional: !0 },
            delay: { type: "amount", integer: !0, min: 0, optional: !0 },
          });
        function Yi(t) {
          var e = new t.Class(t.attrs, t.props);
          if (!1 === e.result) return e;
          if (Object.prototype.hasOwnProperty.call(t, "incidents"))
            for (var n in t.incidents) {
              var i = t.incidents[n],
                r = Yi(i.leaf);
              if (!1 === r.result) return r;
              var s = e.addIncident(r, i.position);
              if (!1 === s.result) return s;
            }
          return e;
        }
        function tr(t) {
          t.descriptor.value = function () {
            var t =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              e =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : {},
              n = this.exportLiveDefinition();
            for (var i in t) Rt(i, t[i], !0, "attrs", n);
            for (var r in e) Rt(r, e[r], !0, "props", n);
            return Yi(n);
          };
        }
        Si.compile({ selector: $i, duration: Bi });
        var er = "mc.descriptive.decisionAuthority";
        function nr(t) {
          t.descriptor.value = function (t) {
            if (null !== this.constructor.attrsValidationRules) {
              var e = this.constructor.attrsValidationMethod(t);
              if (e.length > 0) return { result: !1, errors: e };
            }
            return !0 ===
              this.putMessageOnPipe("checkForClip", {}, er, {
                selfExecute: !0,
                direction: ct,
              }).response
              ? this.manageEditAttrProps(t, "attrs")
              : ((this.attrs = t), { result: !0 });
          };
        }
        function ir(t) {
          t.descriptor.value = function (t) {
            var e = ot.validateProps(
              t,
              this.constructor.propsValidationRules,
              this.constructor
            );
            return e.result
              ? !0 ===
                this.putMessageOnPipe("checkForClip", {}, er, {
                  selfExecute: !0,
                  direction: ct,
                }).response
                ? this.manageEditAttrProps(t, "props")
                : ((this.props = t), { result: !0 })
              : e;
          };
        }
        function rr(t) {
          t.descriptor.value = function () {
            return null !== this.props.host && void 0 !== this.props.host
              ? [this.props.host]
              : this.hasParent &&
                this.putMessageOnPipe("checkForClip", {}, er, {
                  selfExecute: !0,
                  direction: ct,
                }).response
              ? this.putMessageOnPipe(
                  "getElements",
                  { selector: this.selector() },
                  er,
                  { selfExecute: !1, direction: ct }
                ).response
              : [];
          };
        }
        function sr(t) {
          t.descriptor.value = function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : { check: !0 };
            if ("dynamic" === this.duration)
              return {
                result: !1,
                reason:
                  "Incidents with dynamic duration can't be resized. Once the Incident enters a Clip it'll become resizable",
              };
            if (t === this.duration)
              return { result: !0, meta: { unprocessed: !0 } };
            if (t <= 0)
              return { result: !1, reason: "Size must always be > 0" };
            if (e.check && this.hasParent) {
              var n = this.putMessageOnPipe(
                "checkResize",
                { id: this.id, newSize: t, fraction: t / this.duration },
                er,
                { selfExecute: !1, direction: ct }
              );
              if (!n.response.result) return n.response;
            }
            return this.setNewDuration(t), { result: !0 };
          };
        }
        function ar(t) {
          t.descriptor.value = function () {
            return null === this.inheritedSelector
              ? Object.prototype.hasOwnProperty.call(this.props, "selector")
                ? this.props.selector
                : null
              : Object.prototype.hasOwnProperty.call(this.props, "selector")
              ? "&" === this.props.selector.charAt(0)
                ? this.inheritedSelector + this.props.selector.substring(1)
                : ""
                    .concat(this.inheritedSelector, " ")
                    .concat(this.props.selector)
              : this.inheritedSelector;
          };
        }
        var or = (function () {
            function t(e) {
              o(this, t), (this.expressionProps = e);
            }
            return (
              l(t, [
                {
                  key: "calculateValues",
                  value: function (t) {
                    for (var e = [], n = 0; n < t.length; n++) {
                      var i = t[n].getAttribute(this.expressionProps.attribute);
                      J(i) && (i = parseFloat(i)), e.push(i);
                    }
                    return e;
                  },
                },
              ]),
              t
            );
          })(),
          ur = (function () {
            function t(e) {
              o(this, t), (this.patternProps = e);
            }
            return (
              l(t, [
                {
                  key: "calculateValues",
                  value: function (t) {
                    for (
                      var e = this.patternProps.pattern.length, n = [], i = 0;
                      i < t.length;
                      i++
                    )
                      n.push(this.patternProps.pattern[i % e]);
                    return n;
                  },
                },
                {
                  key: "resize",
                  value: function (t) {
                    if ("amount" !== this.patternProps.type)
                      return ""
                        .concat(G.patternValue, "(")
                        .concat(this.patternProps.pattern.join(), ")");
                    for (
                      var e = [], n = 0;
                      n < this.patternProps.pattern.length;
                      n++
                    )
                      e.push(t * this.patternProps.pattern[n]);
                    return "".concat(G.patternValue, "(").concat(e.join(), ")");
                  },
                },
              ]),
              t
            );
          })(),
          lr = function t(e) {
            return (
              o(this, t),
              "expression" === e.dynamicType
                ? new Ii(e)
                : "stagger" === e.dynamicType
                ? new Ai(e)
                : "attribute" === e.dynamicType
                ? new or(e)
                : "pattern" === e.dynamicType
                ? new ur(e)
                : (ot.error(
                    'dynamicType must be either "stgger" or "expression". '.concat(
                      e.dynamicType,
                      " provided"
                    )
                  ),
                  !1)
            );
          },
          cr = new RegExp("^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)", "gi"),
          hr = function (t) {
            var e = [];
            return (
              (function t(n) {
                var i =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : "";
                if (!n) return [];
                for (var r = 0, s = Object.entries(n); r < s.length; r++) {
                  var a = C(s[r], 2),
                    o = a[0],
                    u = a[1];
                  if (!(u instanceof Element))
                    if (H(u))
                      t(
                        u,
                        ""
                          .concat(i)
                          .concat("" === i ? "" : ".")
                          .concat(o)
                      );
                    else if (W(u)) {
                      var l = u.trim();
                      if (l.startsWith(G.staggerPreface)) {
                        var c = Ei(l, !1),
                          h = c.start.match(cr)[0],
                          p = c.end.match(cr)[0],
                          d = c.start.toString().substring(h.length),
                          f = {
                            dynamicType: "stagger",
                            path: ""
                              .concat(i)
                              .concat("" === i ? "" : ".")
                              .concat(o),
                            from: 1 * h,
                            to: 1 * p,
                            mode: c.mode,
                            unit: d,
                            fraction: c.startFraction,
                            easing: c.easing,
                            reverse: c.reverse,
                            type: "" === d ? "amount" : "measurement",
                          };
                        e.push(f);
                      } else if (l.startsWith(G.attibuteValue)) {
                        var m = {
                          dynamicType: "attribute",
                          path: ""
                            .concat(i)
                            .concat("" === i ? "" : ".")
                            .concat(o),
                          unit: "",
                          type: "measurement",
                          attribute: /\(([^\)]+)\)/.exec(l)[1],
                        };
                        e.push(m);
                      } else if (l.startsWith(G.mathExpPreface)) {
                        var v = Oi(l),
                          y = {
                            dynamicType: "expression",
                            path: ""
                              .concat(i)
                              .concat("" === i ? "" : ".")
                              .concat(o),
                            unit: v.unit,
                            type: "" === v.unit ? "amount" : "measurement",
                            expression: v.expression,
                          };
                        e.push(y);
                      } else if (l.startsWith(G.patternValue)) {
                        for (
                          var g = tt(l), b = !0, k = [], x = 0;
                          x < g.length;
                          x++
                        ) {
                          if (!J(g[x])) {
                            b = !1;
                            break;
                          }
                          k.push(parseFloat(g[x]));
                        }
                        b && (g = k);
                        var w = {
                          dynamicType: "pattern",
                          path: ""
                            .concat(i)
                            .concat("" === i ? "" : ".")
                            .concat(o),
                          unit: "",
                          type: b ? "amount" : "measurement",
                          pattern: g,
                        };
                        e.push(w);
                      }
                    }
                }
              })(t),
              e
            );
          };
        function pr(t) {
          t.descriptor.value = function () {
            for (var t = hr(this.props), e = 0; e < t.length; e++)
              this.propsStaggers.push({
                path: t[e].path,
                stagger: new lr(t[e]),
              });
            for (var n = hr(this.attrs), i = 0; i < n.length; i++)
              this.attributesStaggers.push({
                path: n[i].path,
                stagger: new lr(n[i]),
              });
          };
        }
        var dr = T(
            null,
            function (t, e) {
              var n = (function (e) {
                d(i, e);
                var n = g(i);
                function i() {
                  var e,
                    r =
                      arguments.length > 0 && void 0 !== arguments[0]
                        ? arguments[0]
                        : {},
                    s =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : null;
                  o(this, i),
                    null === s
                      ? ((e = n.call(this, r)),
                        t(v(e)),
                        (e.attrs = {}),
                        (e.props = r))
                      : ((e = n.call(this, s)),
                        t(v(e)),
                        (e.attrs = r),
                        (e.props = s));
                  var a = ot.validateProps(e.props, Xi, e.constructor);
                  return a.result
                    ? ((e._inheritedSelector = null),
                      (e.attributesStaggers = []),
                      (e.propsStaggers = []),
                      e.setupDynamicValues(),
                      (e.passiveAddition = !0),
                      e._buildTree(),
                      (e.passiveAddition = !1),
                      y(e))
                    : y(e, a);
                }
                return i;
              })(e);
              return {
                F: n,
                d: [
                  {
                    kind: "field",
                    static: !0,
                    key: "Incident",
                    value: function () {
                      return kt;
                    },
                  },
                  {
                    kind: "field",
                    static: !0,
                    key: "plugin_npm_name",
                    value: function () {
                      return "motor-cortex-js";
                    },
                  },
                  {
                    kind: "field",
                    static: !0,
                    key: "version",
                    value: function () {
                      return Gt;
                    },
                  },
                  {
                    kind: "field",
                    static: !0,
                    key: "Channel",
                    value: function () {
                      return lt;
                    },
                  },
                  {
                    kind: "field",
                    static: !0,
                    key: "ClassName",
                    value: function () {
                      return "Group";
                    },
                  },
                  {
                    kind: "field",
                    static: !0,
                    key: "isGroup",
                    value: function () {
                      return !0;
                    },
                  },
                  {
                    kind: "field",
                    static: !0,
                    key: "attrsValidationRules",
                    value: function () {
                      return null;
                    },
                  },
                  {
                    kind: "field",
                    static: !0,
                    key: "propsValidationRules",
                    value: function () {
                      return Xi;
                    },
                  },
                  {
                    kind: "method",
                    decorators: [nr],
                    key: "editAttributes",
                    value: function () {},
                  },
                  {
                    kind: "method",
                    decorators: [ir],
                    key: "editProperties",
                    value: function () {},
                  },
                  {
                    kind: "method",
                    decorators: [sr],
                    key: "resize",
                    value: function () {},
                  },
                  {
                    kind: "method",
                    decorators: [tr],
                    key: "clone",
                    value: function () {},
                  },
                  {
                    kind: "method",
                    decorators: [ar],
                    key: "selector",
                    value: function () {},
                  },
                  {
                    kind: "method",
                    decorators: [rr],
                    key: "getElements",
                    value: function () {},
                  },
                  {
                    kind: "method",
                    decorators: [pr],
                    key: "setupDynamicValues",
                    value: function () {},
                  },
                  {
                    kind: "method",
                    key: "_buildTree",
                    value: function () {
                      this.buildTree();
                    },
                  },
                  {
                    kind: "method",
                    key: "_calculateDuration",
                    value: function () {
                      var t =
                          arguments.length > 0 &&
                          void 0 !== arguments[0] &&
                          arguments[0],
                        e = 0;
                      for (var n in this.children) {
                        var i = this.children[n];
                        if (
                          (!0 === t &&
                            !0 === i.leaf.constructor.isGroup &&
                            i.leaf._calculateDuration(!0),
                          "dynamic" === i.leaf.duration)
                        ) {
                          e = "dynamic";
                          break;
                        }
                        i.position + i.leaf.duration > e &&
                          (e = i.position + i.leaf.duration);
                      }
                      return (
                        e !== this.calculatedDuration &&
                        ((this.calculatedDuration = e), !0)
                      );
                    },
                  },
                  {
                    kind: "method",
                    key: "_rebuildTree",
                    value: function () {
                      for (var t in this.children) {
                        var e = this.children[t];
                        !0 === e.leaf.passive && this.removeIncident(e.id);
                      }
                      (this.passiveAddition = !0),
                        this.buildTree(),
                        (this.passiveAddition = !1);
                    },
                  },
                  { kind: "method", key: "buildTree", value: function () {} },
                  {
                    kind: "get",
                    key: "duration",
                    value: function () {
                      return "dynamic" === this.calculatedDuration
                        ? this.calculatedDuration
                        : k(f(n.prototype), "duration", this);
                    },
                  },
                  {
                    kind: "set",
                    key: "duration",
                    value: function (t) {
                      w(f(n.prototype), "duration", t, this, !0);
                    },
                  },
                  {
                    kind: "method",
                    key: "manageEditAttrProps",
                    value: function (t, e) {
                      var n = this.parentNode,
                        i = n.getLeafPosition(this.id),
                        r = JSON.parse(JSON.stringify(this[e]));
                      (this[e] = t),
                        n.removeIncident(this.id),
                        this._rebuildTree();
                      var s = n.addIncident(this, i);
                      return (
                        s.result ||
                          ((this[e] = r),
                          this._rebuildTree(),
                          n.addIncident(this, i)),
                        s
                      );
                    },
                  },
                  {
                    kind: "method",
                    key: "detachFromParent",
                    value: function () {
                      k(f(n.prototype), "detachFromParent", this).call(this),
                        (this.inheritedSelector = null);
                    },
                  },
                  {
                    kind: "get",
                    key: "inheritedSelector",
                    value: function () {
                      return this._inheritedSelector;
                    },
                  },
                  {
                    kind: "set",
                    key: "inheritedSelector",
                    value: function (t) {
                      for (var e in ((this._inheritedSelector = t),
                      this.children)) {
                        this.children[
                          e
                        ].leaf.inheritedSelector = this.selector();
                      }
                    },
                  },
                  {
                    kind: "get",
                    key: "selectorToPassToChildren",
                    value: function () {
                      return this.selector();
                    },
                  },
                  {
                    kind: "method",
                    key: "exportDefinition",
                    value: function () {
                      var t = {
                        ClassName: this.constructor.ClassName,
                        version: this.constructor.version,
                        plugin:
                          this.constructor.plugin ||
                          this.constructor.plugin_npm_name,
                        plugin_npm_name: this.constructor.plugin_npm_name,
                        attrs: this.attrs,
                        props: this.props,
                        incidents: {},
                        duration: this.duration,
                      };
                      for (var e in this.children) {
                        var n = this.children[e];
                        !0 !== n.leaf.passive &&
                          (t.incidents[e] = {
                            id: n.id,
                            position: n.position,
                            leaf: n.leaf.exportDefinition(),
                          });
                      }
                      return t;
                    },
                  },
                  {
                    kind: "method",
                    key: "exportLiveDefinition",
                    value: function () {
                      var t =
                          !(arguments.length > 0 && void 0 !== arguments[0]) ||
                          arguments[0],
                        e = JSON.parse(JSON.stringify(this.props));
                      !1 === t && delete e.id;
                      var n = {
                        Class: this.constructor,
                        attrs: JSON.parse(JSON.stringify(this.attrs)),
                        props: e,
                        incidents: {},
                      };
                      for (var i in this.children) {
                        var r = this.children[i];
                        !0 !== r.leaf.passive &&
                          (n.incidents[i] = {
                            position: r.position,
                            leaf: r.leaf.exportLiveDefinition(t),
                          });
                      }
                      return n;
                    },
                  },
                  {
                    kind: "method",
                    key: "addIncident",
                    value: function (t, e) {
                      var i,
                        r =
                          arguments.length > 2 && void 0 !== arguments[2]
                            ? arguments[2]
                            : { check: !0 };
                      if (
                        ((t.inheritedSelector = this.selectorToPassToChildren),
                        !0 === r.check)
                      ) {
                        var s = k(f(n.prototype), "checkAddition", this).call(
                          this,
                          t,
                          e
                        );
                        if (!s.result) return (t.inheritedSelector = null), s;
                        if (
                          !0 ===
                          (i = this.putMessageOnPipe("checkForClip", {}, er, {
                            selfExecute: !0,
                            direction: ct,
                          })).response
                        ) {
                          var a = t.putMessageOnPipe(
                            "checkForInvalidSelectors",
                            {},
                            null,
                            { selfExecute: !0, direction: ht }
                          );
                          if (a.length > 0) {
                            for (var o = [], u = 0; u < a.length; u++)
                              o.push(a[u].response);
                            return { result: !1, errors: o };
                          }
                        }
                        var l = this.putMessageOnPipe(
                          "checkAddition",
                          {
                            incident: t,
                            millisecond: e,
                            parentGroupId: this.id,
                          },
                          er,
                          { selfExecute: !0, direction: ct }
                        );
                        if (!l.response.result)
                          return (t.inheritedSelector = null), l.response;
                      }
                      !0 === this.passiveAddition && (t.passive = !0);
                      var c = this.addChild(t, e);
                      return (
                        c.result || (t.inheritedSelector = null),
                        "dynamic" === t.duration &&
                          i &&
                          this._calculateDuration(!0),
                        c
                      );
                    },
                  },
                  {
                    kind: "method",
                    key: "moveIncident",
                    value: function (t, e) {
                      var i = t;
                      "object" === a(t) && (i = t.id);
                      var r = k(f(n.prototype), "checkEditPosition", this).call(
                        this,
                        i,
                        e
                      );
                      if (!r.result) return r;
                      var s = e - this.getLeafPosition(i);
                      if (0 === s) return { result: !0 };
                      var o = this.putMessageOnPipe(
                        "checkMove",
                        {
                          id: i,
                          millisecond: e,
                          positionDelta: s,
                          parentGroupId: this.id,
                        },
                        er,
                        { selfExecute: !0, direction: ct }
                      );
                      return o.response.result
                        ? this.editPosition(i, e)
                        : o.response;
                    },
                  },
                  {
                    kind: "method",
                    key: "removeIncident",
                    value: function (t) {
                      var e = t;
                      "object" === a(t) && (e = t.id);
                      var i = k(f(n.prototype), "checkRemoveChild", this).call(
                        this,
                        e
                      );
                      if (!i.result) return i;
                      var r = this.putMessageOnPipe(
                        "checkDeletion",
                        { id: e, parentGroupId: this.id },
                        er,
                        { selfExecute: !0, direction: ct }
                      );
                      return r.response.result
                        ? this.removeChild(e)
                        : r.response;
                    },
                  },
                  {
                    kind: "method",
                    key: "handleCheckForClip",
                    value: function (t, e) {
                      return !!this.hasParent && this.bypass();
                    },
                  },
                  {
                    kind: "method",
                    key: "handleCheckAddition",
                    value: function (t, e) {
                      return this.hasParent ? this.bypass() : { result: !0 };
                    },
                  },
                  {
                    kind: "method",
                    key: "handleCheckMove",
                    value: function (t, e) {
                      return this.hasParent ? this.bypass() : { result: !0 };
                    },
                  },
                  {
                    kind: "method",
                    key: "handleCheckDeletion",
                    value: function (t, e) {
                      return this.hasParent ? this.bypass() : { result: !0 };
                    },
                  },
                  {
                    kind: "method",
                    key: "handleCheckResize",
                    value: function (t, e) {
                      return this.hasParent ? this.bypass() : { result: !0 };
                    },
                  },
                  {
                    kind: "method",
                    key: "handleSetDurationDynamic",
                    value: function (t, e) {
                      (this.calculatedDuration = "dynamic"),
                        this.putMessageOnPipe(
                          "setDurationDynamic",
                          {},
                          "Groups",
                          { selfExecute: !1, direction: ct }
                        );
                    },
                  },
                ],
              };
            },
            yt
          ),
          fr = "-",
          mr = {
            isCombo: function (t) {
              return t.incidentClass.isCombo;
            },
            getItem: function (t, e) {
              return (function (t) {
                for (
                  var e,
                    n =
                      arguments.length > 2 && void 0 !== arguments[2]
                        ? arguments[2]
                        : window,
                    i = (t =
                      (arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : R) +
                      "." +
                      t).split("."),
                    r = 0;
                  r < i.length;
                  r++
                ) {
                  if (!Object.prototype.hasOwnProperty.call(n, i[r])) return;
                  (e = n[i[r]]), (n = n[i[r]]);
                }
                return e;
              })(e.join("."), "attrs", t);
            },
            getRepeatPosition: function (t, e, n, i) {
              return i * (e || 0) + (i + 1) * (t || 0) + i * n;
            },
            refersToOwnSelector: function (t, e) {
              var n =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : 0,
                i = e;
              !1 === Array.isArray(e) && (i = e.split("."));
              var r = this.getItem(t, i.slice(0, 2 + n));
              return (
                ("" === r.props.selector ||
                  void 0 === r.props.selector ||
                  null === r.props.selector) &&
                ("props" === i[2] ||
                  !this.isCombo(r) ||
                  this.refersToOwnSelector(t, i, n + 3))
              );
            },
            cascadeSelectors: function (t, e) {
              for (
                var n =
                    arguments.length > 2 && void 0 !== arguments[2]
                      ? arguments[2]
                      : "",
                  i = [],
                  r = 0;
                r < e.length;
                r++
              ) {
                var s = e[r],
                  a = void 0;
                if (
                  ((a = Object.prototype.hasOwnProperty.call(
                    s.props,
                    "selector"
                  )
                    ? "".concat(t, " ").concat(s.props.selector)
                    : t),
                  i.push({
                    path: ""
                      .concat(n)
                      .concat("" === n ? "" : ".")
                      .concat(r, ".props.selector"),
                    value: a,
                  }),
                  this.isCombo(s))
                ) {
                  var o = this.cascadeSelectors(
                    a,
                    s.attrs.incidents,
                    ""
                      .concat(n)
                      .concat("" === n ? "" : ".")
                      .concat(r, ".attrs.incidents")
                  );
                  i = i.concat(o);
                }
              }
              return i;
            },
            createDescriptiveIncidentLikeObject: function (t, e, n, i, r) {
              return {
                constructor: {
                  Incident: t.incidentClass.targetClass.Incident,
                  plugin_npm_name: t.incidentClass.targetClass.plugin_npm_name,
                  Channel: t.incidentClass.targetClass.Channel,
                  isClip: !1,
                },
                attrs: i || t.attrs,
                props: r || t.props,
                selector: function () {
                  return t.props.selector;
                },
                id: t.props.id,
                audioClip: null,
                audio: "no",
                dynamicDurationValue: null,
                putMessageOnPipe: function () {},
                attributesStaggers: e,
                propsStaggers: n,
              };
            },
            parseElementsDynamics: function (t, e, n, i, r) {
              for (
                var s = "incidents.".concat(r, ".attrs"),
                  a = "incidents.".concat(r, ".props"),
                  o = zt(e),
                  u = zt(n),
                  l = 0;
                l < t.length;
                l++
              )
                if (0 === t[l].path.indexOf(s)) {
                  var c = t[l].path.substring(s.length + 1);
                  o.setValue(c, t[l].values[i]);
                } else if (0 === t[l].path.indexOf(a)) {
                  var h = t[l].path.substring(a.length + 1);
                  u.setValue(h, t[l].values[i]);
                }
              return {
                incidentAttrs: o.exportFlattened(),
                incidentProps: u.exportFlattened(),
              };
            },
            getStaggersForChild: function (t, e, n) {
              for (var i = [], r = [], s = 0; s < t.length; s++)
                "position" === n &&
                0 === t[s].path.indexOf("incidents.".concat(e, ".").concat(n))
                  ? r.push({ path: "position", stagger: t[s].stagger })
                  : 0 ===
                    t[s].path.indexOf("incidents.".concat(e, ".").concat(n))
                  ? r.push({
                      path: t[s].path.substring(
                        "incidents.".concat(e, ".").concat(n).length + 1
                      ),
                      stagger: t[s].stagger,
                    })
                  : i.push(t[s]);
              return { identifiedDynamics: r, remainingDynamics: i };
            },
            createElementProxy: function (t, e, n, i, r) {
              for (
                var s = zt(t),
                  a = this.cascadeSelectors(
                    e,
                    t.attrs.incidents,
                    "attrs.incidents"
                  ),
                  o = 0;
                o < i.length;
                o++
              )
                s.setValue("attrs.".concat(i[o].path), i[o].values[n]);
              for (var u = 0; u < r.length; u++)
                s.setValue("props.".concat(r[u].path), r[u].values[n]);
              for (var l = 0; l < a.length; l++)
                s.setValue(a[l].path, a[l].value);
              return s;
            },
          },
          vr = (function (t) {
            d(n, t);
            var e = g(n);
            function n() {
              return o(this, n), e.apply(this, arguments);
            }
            return (
              l(n, [
                {
                  key: "parseAttrsDynamicValues",
                  value: function (t, e) {
                    this.childrenStaggers = [];
                    for (var n = 0; n < t.attributesStaggers.length; n++)
                      mr.refersToOwnSelector(t, t.attributesStaggers[n].path)
                        ? this.staggerAttrs.push({
                            path: t.attributesStaggers[n].path,
                            values: t.attributesStaggers[
                              n
                            ].stagger.calculateValues(e, this.initParams),
                          })
                        : this.childrenStaggers.push(t.attributesStaggers[n]);
                  },
                },
                {
                  key: "handleRecalcDuration",
                  value: function (t, e) {
                    var i = k(
                      f(n.prototype),
                      "handleRecalcDuration",
                      this
                    ).call(this, t, e);
                    return (
                      (this.descriptiveIncident.dynamicDurationValue =
                        1 * this.duration),
                      i
                    );
                  },
                },
                {
                  key: "lastWish",
                  value: function () {
                    (this.descriptiveIncident.dynamicDurationValue = null),
                      this.descriptiveIncident.putMessageOnPipe(
                        "setDurationDynamic",
                        {},
                        "Groups",
                        { selfExecute: !1, direction: ct }
                      ),
                      k(f(n.prototype), "lastWish", this).call(this);
                  },
                },
                {
                  key: "_createElementIncident",
                  value: function (t, e, n, i, r, s) {
                    for (
                      var a = this,
                        o = mr.createElementProxy(
                          e,
                          n.context.getElementSelectorByMCID(s),
                          i,
                          this.staggerAttrs,
                          this.staggerProps
                        ),
                        u = 0;
                      u < this.staggerAttrs.length;
                      u++
                    )
                      o.setValue(
                        "attrs.".concat(this.staggerAttrs[u].path),
                        this.staggerAttrs[u].values[i]
                      );
                    for (
                      var l = jt({
                          id: ""
                            .concat(this.id, "_element")
                            .concat(fr)
                            .concat(i),
                          attrs: {},
                          props: {},
                          Incident: dr.Incident,
                          plugin_npm_name: dr.plugin_npm_name,
                          Channel: dr.Channel,
                          DescriptiveIncident: new dr(),
                        }),
                        c = function (t) {
                          var e = jt({
                              id: ""
                                .concat(a.id, "_element")
                                .concat(fr)
                                .concat(i, "_repeat")
                                .concat(fr)
                                .concat(t),
                              attrs: {},
                              props: {},
                              Incident: dr.Incident,
                              plugin_npm_name: dr.plugin_npm_name,
                              Channel: dr.Channel,
                              DescriptiveIncident: new dr(),
                            }),
                            s = a.childrenStaggers;
                          o.attrs.incidents.forEach(function (u, l) {
                            var c = mr.parseElementsDynamics(
                                a.staggerAttrs,
                                u.attrs,
                                u.props,
                                i,
                                l
                              ),
                              h = c.incidentAttrs,
                              p = c.incidentProps,
                              d = mr.getStaggersForChild(s, l, "attrs"),
                              f = mr.getStaggersForChild(
                                d.remainingDynamics,
                                l,
                                "props"
                              ),
                              m = mr.getStaggersForChild(
                                d.remainingDynamics,
                                l,
                                "position"
                              );
                            (s = f.remainingDynamics),
                              o.setValue(
                                "attrs.incidents.".concat(l, ".props.id"),
                                ""
                                  .concat(a.id, "_element")
                                  .concat(fr)
                                  .concat(i, "_repeat")
                                  .concat(fr)
                                  .concat(t, "_incident")
                                  .concat(fr)
                                  .concat(l)
                              );
                            var v = yr(
                                mr.createDescriptiveIncidentLikeObject(
                                  u,
                                  d.identifiedDynamics,
                                  f.identifiedDynamics,
                                  h,
                                  p
                                ),
                                n
                              ),
                              y = u.position;
                            1 === m.identifiedDynamics.length &&
                              (y = m.identifiedDynamics[0].stagger.calculateValues(
                                new Array(r),
                                a.initParams
                              )[i]),
                              e.addChild(v, y);
                          }),
                            l.addChild(
                              e,
                              mr.getRepeatPosition(
                                o.props.delay,
                                o.props.hiatus,
                                e.duration,
                                t
                              )
                            );
                        },
                        h = 0;
                      h < (o.props.repeats || 1);
                      h++
                    )
                      c(h);
                    this.addChild(l, 0);
                  },
                },
              ]),
              n
            );
          })(Lt);
        function yr(t, e) {
          var n,
            i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
          if ((i && "off" === t.audio) || (!i && "only" === t.audio))
            return null;
          if (
            Object.prototype.hasOwnProperty.call(t.props, "selector") &&
            ((!i && "~" === t.props.selector.charAt(0)) ||
              (i &&
                "~" !== t.props.selector.charAt(0) &&
                !t.constructor.isClip))
          )
            return null;
          if (t.constructor.isClip) {
            if (!Object.prototype.hasOwnProperty.call(t.props, "selector") || i)
              return i ? t.audioClip : t.realClip;
            (n = new Ft(t, e)).plugin_channel_class = lt;
          } else if (t.constructor.isCombo) n = new vr(t, e);
          else if (t.constructor.isGroup)
            for (var r in ((n = jt({
              id: t.id,
              attrs: t.attrs,
              props: t.props,
              Incident: t.constructor.Incident,
              plugin_npm_name: t.constructor.plugin_npm_name,
              Channel: t.constructor.Channel,
              DescriptiveIncident: t,
            })),
            t.children)) {
              var s = yr(t.children[r].leaf, e);
              null !== s && n.addChild(s, t.children[r].position);
            }
          else n = new Lt(t, e);
          return n;
        }
        var gr = "@kissmybutton/self-contained-incidents",
          br = (function (t) {
            d(n, t);
            var e = g(n);
            function n(t, i) {
              var r;
              return (
                o(this, n),
                ((r = e.call(this, t, i)).attrs = t),
                (r.props = i),
                (r.isTheClip = !0),
                (r.blockingWaitings = {}),
                (r.instantiatedChannels = {}),
                (r.isHostedClip = !0),
                (r.instantiatedCopiesContexts = {}),
                (r.instantiatedCopiesUnblockingMethods = []),
                r.onClipInitialise(),
                (r.runTimeInfo = r.props.runTimeInfo),
                (r.durationSubs = []),
                (r.audioClip = !1),
                r
              );
            }
            return (
              l(n, [
                {
                  key: "contextReady",
                  get: function () {
                    return this.context.contextLoaded;
                  },
                },
                { key: "onClipInitialise", value: function () {} },
                {
                  key: "contextLoading",
                  value: function () {
                    this.context.contextLoaded = !1;
                  },
                },
                {
                  key: "contextLoaded",
                  value: function () {
                    for (var t in ((this.context.contextLoaded = !0),
                    this.putMessageOnPipe(
                      "contextLoaded",
                      {},
                      {},
                      { selfExecute: !1, direction: ht }
                    ),
                    this.instantiatedChannels))
                      this.instantiatedChannels[t].recalcScratchValues();
                    for (
                      var e = 0;
                      e < this.instantiatedCopiesUnblockingMethods.length;
                      e++
                    )
                      this.instantiatedCopiesUnblockingMethods[e]();
                    this.unblock();
                  },
                },
                {
                  key: "getElements",
                  value: function (t) {
                    if (null !== this.props.host && void 0 !== this.props.host)
                      return this.context.getElements(t);
                    var e = [];
                    for (var n in this.instantiatedCopiesContexts)
                      for (
                        var i = this.instantiatedCopiesContexts[n].getElements(
                            t
                          ),
                          r = 0;
                        r < i.length;
                        r++
                      )
                        e.push(i[r]);
                    return e;
                  },
                },
                {
                  key: "addContext",
                  value: function (t) {
                    (this.instantiatedCopiesContexts[t.clipId] = t.context),
                      (t.instantiatedCopiesContexts = this.instantiatedCopiesContexts),
                      this.instantiatedCopiesUnblockingMethods.push(t.unblock);
                    var e = this.putMessageOnPipe(
                      "addContext",
                      t,
                      {},
                      { selfExecute: !1, direction: ht }
                    );
                    if (
                      1 === Object.keys(this.instantiatedCopiesContexts).length
                    ) {
                      for (var n in this.instantiatedChannels)
                        this.instantiatedChannels[n].recalcScratchValues(
                          t.clipId
                        );
                      this.context.nonFragmentedContext = t.context;
                    }
                    return e;
                  },
                },
                {
                  key: "exportConstructionArguments",
                  value: function () {
                    return { attrs: this.attrs, props: this.props };
                  },
                },
                {
                  key: "_resize",
                  value: function (t) {
                    for (var e in this.instantiatedChannels)
                      this.instantiatedChannels[e]._resize(t);
                    this.setNewDuration(this.duration * t);
                    for (var n = 0; n < this.durationSubs.length; n++)
                      this.durationSubs[n](this.duration);
                  },
                },
                {
                  key: "addIncident",
                  value: function (t) {
                    for (
                      var e = this,
                        n = this.putMessageOnPipe(
                          "addIncident",
                          {
                            incident: t.incident,
                            millisecond: t.millisecond,
                            parentGroupId: t.parentGroupId,
                            incidentFromDescription: yr,
                            contextData: {
                              clipId: this.id,
                              context: this.context,
                              instantiatedCopiesContexts: this
                                .instantiatedCopiesContexts,
                            },
                            audio: this.audioClip,
                          },
                          t.parentGroupId,
                          { selfExecute: !0, direction: ht }
                        ),
                        i = {},
                        r = 0;
                      r < n.length;
                      r++
                    ) {
                      var s = n[r].response.getIncidentsByChannel(
                        n[r].positionDelta + t.millisecond
                      );
                      for (var a in s) {
                        var o;
                        Object.prototype.hasOwnProperty.call(i, a) ||
                          (i[a] = []),
                          (o = i[a]).push.apply(o, O(s[a]));
                      }
                    }
                    var u = this.checkAddition(i);
                    if (u.result) {
                      return {
                        result: !0,
                        execute: function () {
                          u.execute();
                          for (var i = 0; i < n.length; i++)
                            for (var r in (n[i].responder.addChild(
                              n[i].response,
                              t.millisecond
                            ),
                            n[i].responder.putMessageOnPipe(
                              "recalcDuration",
                              {},
                              "Groups",
                              { selfExecute: !0, direction: ct }
                            ),
                            e.instantiatedCopiesContexts))
                              n[i].responder.putMessageOnPipe(
                                "addContext",
                                {
                                  clipId: r,
                                  context: e.instantiatedCopiesContexts[r],
                                },
                                "ContextAwareIncidents",
                                { selfExecute: !1, direction: ht }
                              );
                          e._calculateDuration();
                        },
                      };
                    }
                    return u;
                  },
                },
                {
                  key: "checkAddition",
                  value: function (t) {
                    var e =
                        arguments.length > 1 && void 0 !== arguments[1]
                          ? arguments[1]
                          : "all-or-nothing",
                      n = !0,
                      i = [],
                      r = [];
                    for (var s in t) {
                      Object.prototype.hasOwnProperty.call(
                        this.instantiatedChannels,
                        s
                      ) ||
                        (this.instantiatedChannels[s] = new t[
                          s
                        ][0].incident.plugin_channel_class({
                          runTimeInfo: this.runTimeInfo,
                          context: this.context,
                          subscribe: this.props.subscribe,
                        }));
                      var a = this.instantiatedChannels[s].addIncidents(
                        t[s],
                        e
                      );
                      (n = n && a.result),
                        a.result ? r.push(a.execute) : (i = i.concat(a.errors));
                    }
                    var o = function () {
                      for (var t = 0; t < r.length; t++) r[t]();
                    };
                    return { result: n, errors: i, execute: o };
                  },
                },
                {
                  key: "moveIncident",
                  value: function (t) {
                    for (
                      var e = this.putMessageOnPipe(
                          "moveIncident",
                          {
                            incidentId: t.id,
                            millisecond: t.millisecond,
                            parentGroupId: t.parentGroupId,
                            contextData: {
                              clipId: this.id,
                              context: this.context,
                            },
                            audio: this.audioClip,
                          },
                          t.parentGroupId,
                          { selfExecute: !0, direction: ht }
                        ),
                        n = {},
                        i = 0;
                      i < e.length;
                      i++
                    ) {
                      var r = e[i].response.getIncidentsByChannel(
                        e[i].positionDelta + t.millisecond
                      );
                      for (var s in r) {
                        var a;
                        Object.prototype.hasOwnProperty.call(n, s) ||
                          (n[s] = []),
                          (a = n[s]).push.apply(a, O(r[s]));
                      }
                    }
                    var o = this.checkMove(n, t.positionDelta);
                    if (o.result) {
                      return {
                        result: !0,
                        execute: function () {
                          o.execute();
                          for (var n = 0; n < e.length; n++)
                            e[n].responder.editPosition(
                              e[n].response.id,
                              t.millisecond
                            ),
                              e[n].responder.putMessageOnPipe(
                                "recalcDuration",
                                {},
                                "Groups",
                                { selfExecute: !0, direction: ct }
                              );
                        },
                      };
                    }
                    return o;
                  },
                },
                {
                  key: "checkMove",
                  value: function (t, e) {
                    var n = !0,
                      i = [],
                      r = [];
                    for (var s in t) {
                      var a = this.instantiatedChannels[s].editIncidents(
                        t[s],
                        e
                      );
                      (n = n && a.result),
                        a.result ? r.push(a.execute) : (i = i.concat(a.errors));
                    }
                    return {
                      result: n,
                      errors: i,
                      execute: function () {
                        for (var t = 0; t < r.length; t++) r[t]();
                      },
                    };
                  },
                },
                {
                  key: "removeIncident",
                  value: function (t) {
                    for (
                      var e = this.putMessageOnPipe(
                          "removeIncident",
                          {
                            incidentId: t.id,
                            parentGroupId: t.parentGroupId,
                            contextData: {
                              clipId: this.id,
                              context: this.context,
                            },
                            audio: this.audioClip,
                          },
                          t.parentGroupId,
                          { selfExecute: !0, direction: ht }
                        ),
                        n = {},
                        i = 0;
                      i < e.length;
                      i++
                    ) {
                      var r = e[i].response.getIncidentsByChannel();
                      for (var s in r) {
                        var a;
                        Object.prototype.hasOwnProperty.call(n, s) ||
                          (n[s] = []),
                          (a = n[s]).push.apply(a, O(r[s]));
                      }
                    }
                    var o = this.checkDelete(n);
                    if (o.result) {
                      return {
                        result: !0,
                        execute: function () {
                          o.execute();
                          for (var t = 0; t < e.length; t++)
                            e[t].responder.removeChild(e[t].response.id),
                              e[t].responder.putMessageOnPipe(
                                "recalcDuration",
                                {},
                                "Groups",
                                { selfExecute: !0, direction: ct }
                              );
                        },
                      };
                    }
                    return o;
                  },
                },
                {
                  key: "checkDelete",
                  value: function (t) {
                    var e = !0,
                      n = [],
                      i = [];
                    for (var r in t) {
                      var s = this.instantiatedChannels[r].removeIncidents(
                        t[r]
                      );
                      (e = e && s.result),
                        s.result ? i.push(s.execute) : (n = n.concat(s.errors));
                    }
                    return {
                      result: e,
                      errors: n,
                      execute: function () {
                        for (var t = 0; t < i.length; t++) i[t]();
                      },
                    };
                  },
                },
                {
                  key: "resizeIncident",
                  value: function (t) {
                    for (
                      var e = this.putMessageOnPipe(
                          "resize",
                          {
                            incidentId: t.id,
                            newSize: t.newSize,
                            fraction: t.fraction,
                            contextData: {
                              clipId: this.id,
                              context: this.context,
                            },
                            audio: this.audioClip,
                          },
                          t.id,
                          { selfExecute: !1, direction: ht }
                        ),
                        n = {},
                        i = 0;
                      i < e.length;
                      i++
                    ) {
                      var r = e[i].response.getIncidentsByChannel(
                        e[i].positionDelta
                      );
                      for (var s in r) {
                        var a;
                        Object.prototype.hasOwnProperty.call(n, s) ||
                          (n[s] = []),
                          (a = n[s]).push.apply(a, O(r[s]));
                      }
                    }
                    var o = 0;
                    e.length > 0 && (o = e[0].positionDelta);
                    var u = this.checkResize(t.fraction, n, o);
                    if (u.result) {
                      return {
                        result: !0,
                        execute: function () {
                          u.execute();
                          for (var n = 0; n < e.length; n++)
                            e[n].responder.setNewDuration(t.newSize);
                        },
                      };
                    }
                    return u;
                  },
                },
                {
                  key: "checkResize",
                  value: function (t, e) {
                    var n =
                        arguments.length > 2 && void 0 !== arguments[2]
                          ? arguments[2]
                          : 0,
                      i = !0,
                      r = [],
                      s = [];
                    for (var a in e) {
                      var o = ot.systoleDiastoleProjections(e[a], t, n),
                        u = this.instantiatedChannels[a].checkResizedIncidents(
                          o
                        );
                      (i = i && u.result),
                        u.result ? s.push(u.execute) : (r = r.concat(u.errors));
                    }
                    var l = function () {
                      for (var t = 0; t < s.length; t++) s[t]();
                    };
                    return { result: i, errors: r, execute: l };
                  },
                },
                {
                  key: "context",
                  get: function () {
                    var t, e;
                    return (
                      (null !== (e = (t = this.ownContext).contextLoaded) &&
                        void 0 !== e) ||
                        (t.contextLoaded = !0),
                      this.ownContext
                    );
                  },
                },
                {
                  key: "getIncidentsByChannel",
                  value: function () {
                    var t =
                        arguments.length > 0 && void 0 !== arguments[0]
                          ? arguments[0]
                          : 0,
                      e = {};
                    return (
                      (e[gr] = [
                        { millisecond: t, incident: this, id: this.id },
                      ]),
                      e
                    );
                  },
                },
                {
                  key: "setVolume",
                  value: function (t) {
                    this.volume = parseFloat(t);
                  },
                },
                { key: "_onGetContextOnce", value: function (t) {} },
                {
                  key: "handleRecalcDuration",
                  value: function (t, e) {
                    if (this._calculateDuration())
                      for (var n = 0; n < this.durationSubs.length; n++)
                        this.durationSubs[n](this.duration);
                    return !0;
                  },
                },
                {
                  key: "onProgress",
                  value: function (t, e, n) {
                    var i =
                      arguments.length > 3 &&
                      void 0 !== arguments[3] &&
                      arguments[3];
                    if (!1 !== this.contextReady) {
                      for (var r in (n || (n = this.id),
                      this.instantiatedChannels)) {
                        var s = this.instantiatedChannels[r];
                        s.moveTo(this.runTimeInfo.currentMillisecond, e, n, i);
                      }
                      this.onAfterProgress(t, e);
                    } else this.setBlock();
                  },
                },
                { key: "onAfterProgress", value: function (t, e) {} },
                {
                  key: "flash",
                  value: function () {
                    for (var t in this.instantiatedChannels) {
                      this.instantiatedChannels[t].moveTo(
                        0,
                        this.runTimeInfo.currentMillisecond,
                        this.id,
                        !0
                      );
                    }
                  },
                },
                {
                  key: "subscribeToDurationChange",
                  value: function (t) {
                    this.durationSubs.push(t);
                  },
                },
                { key: "handleSetBlockingWaiting", value: function (t, e) {} },
                {
                  key: "handleRemoveBlockingWaiting",
                  value: function (t, e) {},
                },
              ]),
              n
            );
          })(kt),
          kr = (function () {
            function t() {
              o(this, t),
                (this.output = q.createGain()),
                (this.gainNode = q.createGain()),
                q.createStereoPanner &&
                  (this.pannerNode = q.createStereoPanner()),
                q.createStereoPanner
                  ? (this.pannerNode.connect(this.gainNode),
                    this.gainNode.connect(this.output),
                    (this.input = this.pannerNode))
                  : (this.gainNode.connect(this.output),
                    (this.input = this.gainNode));
            }
            return (
              l(t, [
                {
                  key: "connect",
                  value: function (t) {
                    this.output.connect(t);
                  },
                },
                {
                  key: "disconnect",
                  value: function () {
                    this.output.disconnect();
                  },
                },
              ]),
              t
            );
          })();
        function xr(t) {
          for (
            var e = window.atob(t), n = e.length, i = new Uint8Array(n), r = 0;
            r < n;
            r++
          )
            i[r] = e.charCodeAt(r);
          return i.buffer;
        }
        var wr = /\[data(-mcid="+\w+")+\]/g,
          Cr = (function () {
            function t() {
              o(this, t), (this.subscribers = []);
            }
            return (
              l(t, [
                {
                  key: "sub",
                  value: function (t, e) {
                    this.subscribers.push(e);
                  },
                },
                {
                  key: "pub",
                  value: function (t) {
                    for (var e = 0; e < this.subscribers.length; e++)
                      this.subscribers[e](t);
                  },
                },
              ]),
              t
            );
          })(),
          Or = (function () {
            function t() {
              var e = this,
                n =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : {},
                i = arguments.length > 1 ? arguments[1] : void 0;
              o(this, t),
                (this.totalSources = n.length),
                (this.audioSources = {}),
                (this.elementsByMCID = {});
              for (
                var r = function (t) {
                    var r = n[t],
                      s = {
                        mcid: r.mcid || rt(),
                        id: r.id,
                        src: r.src,
                        classes: r.classes || [],
                        base64: r.base64 || !1,
                        pubSub: new Cr(),
                        soundLoaded: !1,
                        startValues: r.startValues || {},
                      };
                    if (
                      ((e.audioSources[s.id] = s),
                      (e.elementsByMCID[s.mcid] = s),
                      r.base64)
                    )
                      q.decodeAudioData(xr(r.src), function (t) {
                        e._setBuffer(s, t, i);
                      });
                    else {
                      var a = new XMLHttpRequest();
                      a.open("GET", s.src, !0),
                        (a.responseType = "arraybuffer"),
                        (e.soundLoaded = !1),
                        (a.onload = function () {
                          q.decodeAudioData(
                            a.response,
                            function (t) {
                              e._setBuffer(s, t, i);
                            },
                            e.onError
                          );
                        }),
                        a.send();
                    }
                  },
                  s = 0;
                s < n.length;
                s++
              )
                r(s);
              this.context = {
                document: document,
                window: window,
                rootElement: document.body,
                unmount: function () {},
                masterNode: i,
                audioContext: q,
                getElements: this.getElements.bind(this),
                getMCID: this.getMCID.bind(this),
                setMCID: this.setMCID.bind(this),
                getElementSelectorByMCID: this.getElementSelectorByMCID.bind(
                  this
                ),
                getElementByMCID: this.getElementByMCID.bind(this),
              };
            }
            return (
              l(t, [
                {
                  key: "_setBuffer",
                  value: function (t, e, n) {
                    (t.soundLoaded = !0),
                      (t.buffer = e),
                      (t.effectsAudioNode = new kr()),
                      t.effectsAudioNode.connect(n.input),
                      t.pubSub.pub();
                  },
                },
                {
                  key: "getElementByMCID",
                  value: function (t) {
                    return Object.prototype.hasOwnProperty.call(
                      this.elementsByMCID,
                      t
                    )
                      ? this.elementsByMCID[t]
                      : null;
                  },
                },
                {
                  key: "getElements",
                  value: function (t) {
                    if ("~" !== t.charAt(0)) {
                      if (wr.exec(t)) {
                        var e = t.split('"')[1];
                        return this.elementsByMCID[e];
                      }
                      return [];
                    }
                    if ("#" === (t = t.substr(1)).charAt(0))
                      return Object.prototype.hasOwnProperty.call(
                        this.audioSources,
                        t.substr(1)
                      )
                        ? [this.audioSources[t.substr(1)]]
                        : [];
                    if ("." === t.charAt(0)) {
                      var n = t.substr(1),
                        i = [];
                      for (var r in this.audioSources)
                        r.classes.indexOf(n) >= 0 && i.push(r);
                      return i;
                    }
                  },
                },
                {
                  key: "getMCID",
                  value: function (t) {
                    return t.mcid;
                  },
                },
                {
                  key: "setMCID",
                  value: function (t, e) {
                    t.mcid = e;
                  },
                },
                {
                  key: "getElementSelectorByMCID",
                  value: function (t) {
                    return '[data-mcid="'.concat(t, '"]');
                  },
                },
              ]),
              t
            );
          })(),
          Ir = (function (t) {
            d(n, t);
            var e = g(n);
            function n(t, i) {
              var r;
              o(this, n),
                ((r = e.call(this, t, i)).audioNode = new kr()),
                r.audioNode.connect(q.destination);
              var s = new Or(r.props.audioSources, r.audioNode);
              return (
                (r.ownContext = p(p({}, s.context), {}, { isHostedClip: !0 })),
                (r.audioClip = !0),
                r
              );
            }
            return (
              l(n, [
                {
                  key: "onProgress",
                  value: function (t, e, i) {
                    var r =
                      arguments.length > 3 &&
                      void 0 !== arguments[3] &&
                      arguments[3];
                    k(f(n.prototype), "onProgress", this).call(
                      this,
                      t,
                      e,
                      this.id,
                      r
                    );
                  },
                },
                {
                  key: "_onGetContextOnce",
                  value: function (t) {
                    this.audioNode.disconnect(),
                      (this.parentClipContext = t),
                      this.audioNode.connect(t.masterNode.input);
                  },
                },
                {
                  key: "lastWish",
                  value: function () {
                    this.audioNode.output.disconnect(),
                      this.audioNode.output.connect(q.destination);
                  },
                },
                {
                  key: "setVolume",
                  value: function (t) {
                    this.audioNode.output.gain.value = t;
                  },
                },
              ]),
              n
            );
          })(br),
          Pr = (function (t) {
            d(n, t);
            var e = g(n);
            function n() {
              return o(this, n), e.apply(this, arguments);
            }
            return (
              l(n, [
                {
                  key: "onProgress",
                  value: function (t) {
                    var e = this;
                    if (!this.element.soundLoaded)
                      return (
                        this.setBlock("loading sound"),
                        this.element.pubSub.sub(this.id, function () {
                          e.unblock();
                        }),
                        !1
                      );
                    if ("gain" === this.attributeKey) {
                      var n =
                        (this.targetValue - this.initialValues) * t +
                        this.initialValues;
                      this.element.effectsAudioNode.gainNode.gain.value = n;
                    } else if ("pan" === this.attributeKey) {
                      var i =
                        (this.targetValue - this.initialValues) * t +
                        this.initialValues;
                      this.element.effectsAudioNode.pannerNode.pan.value = i;
                    }
                  },
                },
                {
                  key: "getScratchValue",
                  value: function () {
                    return "pan" === this.attributeKey
                      ? Object.prototype.hasOwnProperty.call(
                          this.element.startValues,
                          "pan"
                        )
                        ? this.element.startValues.pan
                        : 0
                      : "gain" === this.attributeKey
                      ? Object.prototype.hasOwnProperty.call(
                          this.element.startValues,
                          "gain"
                        )
                        ? this.element.startValues.gain
                        : 1
                      : void 0;
                  },
                },
              ]),
              n
            );
          })(St),
          Er = "|||",
          Ar = (function (t) {
            d(n, t);
            var e = g(n);
            function n(t) {
              var i;
              return (
                o(this, n),
                ((i = e.call(this, t)).playingIncidentsIds = []),
                (i.transitioned = !1),
                t.subscribe(rt(), i._stateChange.bind(v(i)), 0, 1, !0),
                i
              );
            }
            return (
              l(n, [
                {
                  key: "_stateChange",
                  value: function (t, e) {
                    ("paused" !== e && "idle" !== e && "blocked" !== e) ||
                      (this._stopPlayingIncidents(), (this.transitioned = !0));
                  },
                },
                {
                  key: "_stopPlayingIncidents",
                  value: function () {
                    for (var t = 0; t < this.playingIncidentsIds.length; t++) {
                      var e = this.playingIncidentsIds[t].split(Er);
                      this._incidentById(e[0]).stop(e[1]);
                    }
                    this.playingIncidentsIds = [];
                  },
                },
                {
                  key: "moveTo",
                  value: function (t, e, n) {
                    var i =
                      arguments.length > 3 &&
                      void 0 !== arguments[3] &&
                      arguments[3];
                    if ("transitional" === this.runTimeInfo.state || i) {
                      (this.transitioned = !0), this._stopPlayingIncidents();
                      for (var r = 0; r < this.incidents.length; r++) {
                        var s = this.incidents[r],
                          a = s.id,
                          o = s.millisecond,
                          u = this._incidentById(a),
                          l = void 0,
                          c = void 0;
                        e < o
                          ? ((l = 0), (c = 0))
                          : e > o + u.duration
                          ? ((l = 1), (c = u.duration))
                          : (l = (c = e - o) / u.duration),
                          u.onProgress(l, c, n, !0);
                      }
                    } else {
                      this.transitioned && ((t = 0), (this.transitioned = !1));
                      for (var h = this.incidents, p = 0; p < h.length; p++) {
                        var d = h[p],
                          f = d.millisecond,
                          m = this._incidentById(d.id),
                          v = m.duration,
                          y = f + v,
                          g = "".concat(d.id).concat(Er).concat(n);
                        if (f >= t && f < e && y > e) {
                          var b = (e - f) / v >= 1,
                            k = b ? 1 : (e - f) / v,
                            x = b ? v : e - f,
                            w = m.play(k, x, n);
                          w && this.playingIncidentsIds.push(g);
                        } else if (y > t && y <= e) {
                          m.stop(n);
                          var C = this.playingIncidentsIds.indexOf(g);
                          C > -1 && this.playingIncidentsIds.splice(C, 1);
                        }
                      }
                      this.runTimeInfo.currentMillisecond = e;
                    }
                  },
                },
              ]),
              n
            );
          })(xt),
          _r = T(null, function (t) {
            return {
              F: function e() {
                var n =
                    arguments.length > 0 && void 0 !== arguments[0]
                      ? arguments[0]
                      : {},
                  i =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : {},
                  r = arguments.length > 2 ? arguments[2] : void 0;
                o(this, e),
                  t(this),
                  (this.attrs = n),
                  (this.props = i),
                  (this.dna = r),
                  (this.context = r.context),
                  (this.mcid = r.mcid),
                  (this.id = i.id || rt()),
                  (this.modelId = i.modelId),
                  (this.gotContext = !1),
                  (this.plugin_channel_class = Ar),
                  (this.mc_plugin_npm_name = "motor-cortex-js-media-playback"),
                  Object.prototype.hasOwnProperty.call(
                    i,
                    "plugin_channel_class"
                  ) && (this.plugin_channel_class = i.plugin_channel_class),
                  Object.prototype.hasOwnProperty.call(
                    i,
                    "mc_plugin_npm_name"
                  ) && (this.mc_plugin_npm_name = i.mc_plugin_npm_name),
                  (this.hasIncidents = !1),
                  (this.autoGenerated = !1),
                  this.onInitialise(n, i);
              },
              d: [
                {
                  kind: "get",
                  key: "selector",
                  value: function () {
                    return this.props.selector;
                  },
                },
                {
                  kind: "get",
                  key: "element",
                  value: function () {
                    return this.context.getElementByMCID(this.mcid);
                  },
                },
                {
                  kind: "method",
                  decorators: [Tt],
                  key: "getIncidentsByChannel",
                  value: function () {},
                },
                {
                  kind: "method",
                  key: "_onGetContextOnce",
                  value: function () {
                    try {
                      if (!0 === this.context.fragment) return;
                      this.gotContext ||
                        (this.onGetContext(), (this.gotContext = !0));
                    } catch (t) {
                      ot.error(t), ot.error(this.mcid);
                    }
                  },
                },
                {
                  kind: "method",
                  key: "onGetContext",
                  value: function () {
                    ot.info(
                      'Overwritte the "onGetContext" method with the code you want to get executed',
                      "info"
                    );
                  },
                },
                { kind: "method", key: "lastWish", value: function () {} },
                {
                  kind: "method",
                  key: "onInitialise",
                  value: function () {
                    ot.info(
                      'Overwritte the "onInialise" method with the code you want to get executed',
                      "info"
                    );
                  },
                },
                {
                  kind: "method",
                  key: "onProgress",
                  value: function (t, e) {},
                },
                {
                  kind: "method",
                  key: "play",
                  value: function (t) {
                    return !0;
                  },
                },
                { kind: "method", key: "stop", value: function () {} },
                {
                  kind: "method",
                  decorators: [gt],
                  key: "setBlock",
                  value: function () {},
                },
                {
                  kind: "method",
                  decorators: [bt],
                  key: "unblock",
                  value: function () {},
                },
              ],
            };
          }),
          Dr = {
            npm_name: "@kissmybutton/motorcortex-soundsystem",
            name: "Internal MotorCortex Soundsystem",
            incidents: [
              {
                exportable: (function (t) {
                  d(n, t);
                  var e = g(n);
                  function n() {
                    return o(this, n), e.apply(this, arguments);
                  }
                  return (
                    l(n, [
                      {
                        key: "play",
                        value: function (t) {
                          var e = this;
                          if (!this.element.soundLoaded)
                            return (
                              this.setBlock("loading sound"),
                              this.element.pubSub.sub(this.id, function () {
                                e.unblock();
                              }),
                              !1
                            );
                          var n = 0;
                          return (
                            Object.prototype.hasOwnProperty.call(
                              this.props,
                              "startFrom"
                            ) && (n = this.props.startFrom),
                            (this.audioNode = q.createBufferSource()),
                            (this.audioNode.buffer = this.element.buffer),
                            this.audioNode.connect(
                              this.element.effectsAudioNode.input
                            ),
                            this.audioNode.start(0, (t + n) / 1e3),
                            !0
                          );
                        },
                      },
                      {
                        key: "stop",
                        value: function () {
                          this.audioNode.stop();
                        },
                      },
                    ]),
                    n
                  );
                })(_r),
                name: "AudioPlayback",
              },
              { exportable: Pr, name: "AudioEffect" },
            ],
            Clip: { exportable: Ir },
            audio: "only",
          },
          Tr = (function () {
            function t() {
              var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : null;
              o(this, t),
                (this.realArray = []),
                null != e && (this.realArray = e);
            }
            return (
              l(t, [
                {
                  key: "_hasOwnProperty",
                  value: function (t) {
                    return Object.prototype.hasOwnProperty.call(
                      this.realArray,
                      t
                    );
                  },
                },
                {
                  key: "_get",
                  value: function (t) {
                    return this.realArray[t];
                  },
                },
                {
                  key: "_set",
                  value: function (t, e) {
                    this.realArray[t] = e;
                  },
                },
                {
                  key: "_keys",
                  value: function () {
                    return Object.keys(this.realArray);
                  },
                },
                {
                  key: "_delete",
                  value: function (t) {
                    return delete this.realArray[t];
                  },
                },
                {
                  key: "_export",
                  value: function () {
                    return this.realArray;
                  },
                },
              ]),
              t
            );
          })(),
          Sr = (function () {
            function t(e) {
              o(this, t),
                (this.originalArray = e),
                (this.extraArray = {}),
                (this.addedKeys = []),
                (this.removedKeys = []);
            }
            return (
              l(t, [
                {
                  key: "_hasOwnProperty",
                  value: function (t) {
                    return (
                      Object.prototype.hasOwnProperty.call(
                        this.originalArray,
                        t
                      ) ||
                      Object.prototype.hasOwnProperty.call(this.extraArray, t)
                    );
                  },
                },
                {
                  key: "_get",
                  value: function (t) {
                    return Object.prototype.hasOwnProperty.call(
                      this.extraArray,
                      t
                    )
                      ? this.extraArray[t]
                      : Object.prototype.hasOwnProperty.call(
                          this.originalArray,
                          t
                        )
                      ? this.originalArray[t]
                      : void 0;
                  },
                },
                {
                  key: "_set",
                  value: function (t, e) {
                    (this.extraArray[t] = e),
                      Object.prototype.hasOwnProperty.call(
                        this.originalArray,
                        t
                      ) || this.addedKeys.push(t);
                    var n = this.removedKeys.indexOf(t);
                    n > -1 && this.removedKeys.splice(n, 1);
                  },
                },
                {
                  key: "_keys",
                  value: function () {
                    for (
                      var t = Object.keys(this.originalArray).concat(
                          this.addedKeys
                        ),
                        e = 0;
                      e < this.removedKeys.length;
                      e++
                    ) {
                      var n = this.removedKeys.indexOf(this.removedKeys[e]);
                      t.splice(n, 1);
                    }
                    return t;
                  },
                },
                {
                  key: "_delete",
                  value: function (t) {
                    var e = this.addedKeys.indexOf(t);
                    return e > -1
                      ? (this.addedKeys.splice(e), delete this.extraArray[t])
                      : this.removedKeys.push(t);
                  },
                },
                {
                  key: "_export",
                  value: function () {
                    for (var t in this.extraArray)
                      this.originalArray[t] = this.extraArray[t];
                    for (var e = 0; e < this.removedKeys.length; e++)
                      delete this.originalArray[this.removedKeys[e]];
                    return this.originalArray;
                  },
                },
              ]),
              t
            );
          })();
        function Mr(t, e, n, i) {
          var r = !1;
          for (var s in e)
            Object.prototype.hasOwnProperty.call(n, s) ||
              ((r = !0), (i[s] = e[s]));
          return (t.animatedAttributeValue = i), r;
        }
        function jr(t, e, n, i) {
          var r =
              arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
            s = t[i],
            a = e._get(s.id);
          a.setInitialValue(n, r);
          var o = Mr(
            a,
            a.initialValue,
            a.originalAnimatedAttributeValue,
            JSON.parse(JSON.stringify(a.animatedAttributeValue))
          );
          o && (a.lastWish(), a.onGetContext()),
            o &&
              i < t.length - 1 &&
              jr(t, e, a.animatedAttributeValue, i + 1, !1);
        }
        var Vr = (function () {
            function t() {
              var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {};
              o(this, t),
                (this.lanes = {}),
                e.lanes && (this.lanes = e.lanes),
                (this.comboAttributes = {}),
                null != e.comboAttributes &&
                  (this.comboAttributes = e.comboAttributes),
                (this.belongingLaneKeysByAnimationId = {}),
                e.belongingLaneKeysByAnimationId &&
                  (this.belongingLaneKeysByAnimationId =
                    e.belongingLaneKeysByAnimationId),
                (this.incidentsById = new Tr({})),
                e.incidentsById && (this.incidentsById = e.incidentsById);
            }
            return (
              l(t, [
                {
                  key: "_resize",
                  value: function (t) {
                    for (
                      var e = Object.keys(this.lanes), n = 0;
                      n < e.length;
                      n++
                    )
                      for (
                        var i = e[n], r = this.lanes[i], s = 0;
                        s < r.length;
                        s++
                      )
                        r[s].millisecond = r[s].millisecond * t;
                  },
                },
                {
                  key: "createTestLanesSanbox",
                  value: function () {
                    var e = {
                      lanes: zt(this.lanes),
                      belongingLaneKeysByAnimationId: zt(
                        this.belongingLaneKeysByAnimationId
                      ),
                      incidentsById: new Sr(this.incidentsById._export()),
                    };
                    return (
                      this.comboAttributes &&
                        (e.comboAttributes = this.comboAttributes),
                      new t(e)
                    );
                  },
                },
                {
                  key: "getLane",
                  value: function (t, e) {
                    return this.lanes[st(t, e)];
                  },
                },
                {
                  key: "applySandboxChanges",
                  value: function (t) {
                    (this.lanes = t.lanes.exportFlattened()),
                      (this.belongingLaneKeysByAnimationId = t.belongingLaneKeysByAnimationId.exportFlattened()),
                      (this.incidentsById = new Tr(t.incidentsById._export()));
                  },
                },
                {
                  key: "laneExists",
                  value: function (t, e) {
                    var n =
                        arguments.length > 2 &&
                        void 0 !== arguments[2] &&
                        arguments[2],
                      i = st(t, e);
                    return (
                      !!this.lanes.hasOwnProperty(i) ||
                      (n && this.lanes.setValue(i, []), !1)
                    );
                  },
                },
                {
                  key: "getOverlappingAnims",
                  value: function (t, e, n) {
                    var i = this,
                      r =
                        arguments.length > 3 && void 0 !== arguments[3]
                          ? arguments[3]
                          : [],
                      s =
                        arguments.length > 4 && void 0 !== arguments[4]
                          ? arguments[4]
                          : null;
                    return Array.from(this.lanes[st(e, n)] || []).filter(
                      function (e) {
                        var n = t.incident.duration;
                        null != s && (n = s);
                        var a = i.incidentsById._get(e.id).duration;
                        return (
                          e.id !== t.incident.id &&
                          !r.includes(e.id) &&
                          ((e.millisecond >= t.millisecond &&
                            e.millisecond < n + t.millisecond) ||
                            (e.millisecond + a > t.millisecond &&
                              e.millisecond + a <= n + t.millisecond) ||
                            (e.millisecond < t.millisecond &&
                              e.millisecond + a > n + t.millisecond))
                        );
                      }
                    );
                  },
                },
                {
                  key: "addElementToLane",
                  value: function (t, e, n, i) {
                    var r = this,
                      s = [],
                      a = st(t, e);
                    this.incidentsById._set(i.id, i);
                    var o = { millisecond: n, id: i.id };
                    this.laneExists(t, e, !0),
                      this.lanes.pushValue(a, o),
                      this.lanes[a].sortBy("millisecond");
                    var u = this.lanes[a],
                      l = this.lanes[a].findIndex(function (t) {
                        return t.id === i.id;
                      });
                    return (
                      Object.prototype.hasOwnProperty.call(i.id) ||
                        this.belongingLaneKeysByAnimationId.setValue(i.id, []),
                      this.belongingLaneKeysByAnimationId.pushValue(i.id, a),
                      0 === l
                        ? this.lanes[a].length > 1
                          ? s.push(function () {
                              i.setInitialValue(
                                r.incidentsById._get(u[1].id).pureInitialValues
                              );
                            })
                          : s.push(function () {
                              i.setInitialValue();
                            })
                        : s.push(function () {
                            i.setInitialValue(
                              r.incidentsById._get(u[l - 1].id)
                                .animatedAttributeValue
                            );
                          }),
                      Object.prototype.hasOwnProperty.call(
                        this.comboAttributes,
                        e
                      ) &&
                        s.push(function () {
                          return jr(u, r.incidentsById, i.initialValue, l);
                        }),
                      l + 1 < u.length &&
                        s.push(function () {
                          r.incidentsById
                            ._get(u[l + 1].id)
                            .setInitialValue(i.animatedAttributeValue),
                            r.incidentsById._get(u[l + 1].id).gotContext &&
                              (r.incidentsById._get(u[l + 1].id).lastWish(),
                              r.incidentsById._get(u[l + 1].id).onGetContext());
                        }),
                      s
                    );
                  },
                },
                {
                  key: "updateLane",
                  value: function (t, e) {
                    for (var n = this, i = {}, r = 0; r < t.length; r++)
                      for (
                        var s = this.belongingLaneKeysByAnimationId[t[r]],
                          a = 0;
                        a < s.length;
                        a++
                      ) {
                        var o = s[a];
                        Object.prototype.hasOwnProperty.call(i, o) ||
                          (i[o] = {
                            animations: [],
                            lane: this.lanes[o],
                            laneData: nt(s[a]),
                          }),
                          i[o].animations.push(t[r]);
                      }
                    for (var u in i) {
                      var l = i[u],
                        c = l.laneData,
                        h = l.lane,
                        p = l.animations,
                        d = O(h);
                      d.sort(function (t, e) {
                        return t.millisecond - e.millisecond;
                      });
                      for (
                        var f = Object.prototype.hasOwnProperty.call(
                            this.comboAttributes,
                            c.attribute
                          ),
                          m = 0;
                        m < h.length;
                        m++
                      )
                        p.includes(h[m].id) && (h[m].millisecond += e);
                      h.sort(function (t, e) {
                        return t.millisecond - e.millisecond;
                      }),
                        (this.lanes[u] = h);
                      for (
                        var v = function (t) {
                            var e = p[t],
                              i = d.findIndex(function (t) {
                                return t.id === e;
                              }),
                              r = h.findIndex(function (t) {
                                return t.id === e;
                              });
                            if (i === r && r <= 1) return "continue";
                            var s = n.incidentsById._get(h[r].id);
                            if (i + 1 < h.length)
                              if (0 === i)
                                if (f)
                                  jr(
                                    h,
                                    n.incidentsById,
                                    s.pureInitialValues,
                                    0,
                                    !0
                                  );
                                else {
                                  var a = n.incidentsById._get(d[1].id);
                                  a.setInitialValue(s.pureInitialValues),
                                    a.onGetContext();
                                }
                              else if (f) {
                                var o = r > i ? i : r;
                                jr(
                                  h,
                                  n.incidentsById,
                                  n.incidentsById._get(d[i - 1].id)
                                    .animatedAttributeValue,
                                  o,
                                  !0
                                );
                              } else
                                n.incidentsById
                                  ._get(d[i + 1].id)
                                  .setInitialValue(
                                    n.incidentsById._get(d[i - 1].id)
                                      .animatedAttributeValue
                                  ),
                                  n.incidentsById
                                    ._get(d[i + 1].id)
                                    .onGetContext();
                            if (
                              (0 === r
                                ? f
                                  ? jr(
                                      h,
                                      n.incidentsById,
                                      n.incidentsById._get(d[0].id)
                                        .pureInitialValues,
                                      r,
                                      !0
                                    )
                                  : (s.setInitialValue(
                                      n.incidentsById._get(d[0].id)
                                        .pureInitialValues
                                    ),
                                    s.onGetContext())
                                : f
                                ? jr(
                                    h,
                                    n.incidentsById,
                                    n.incidentsById._get(h[r - 1].id)
                                      .animatedAttributeValue,
                                    r,
                                    !0
                                  )
                                : (s.setInitialValue(
                                    n.incidentsById._get(h[r - 1].id)
                                      .animatedAttributeValue
                                  ),
                                  s.onGetContext()),
                              r + 1 >= h.length)
                            )
                              return "continue";
                            if (f)
                              return (
                                jr(
                                  h,
                                  n.incidentsById,
                                  s.animatedAttributeValue,
                                  r + 1,
                                  !0
                                ),
                                "continue"
                              );
                            var u = n.incidentsById._get(h[r + 1].id);
                            u.setInitialValue(s.animatedAttributeValue),
                              u.onGetContext();
                          },
                          y = 0;
                        y < p.length;
                        y++
                      )
                        v(y);
                    }
                  },
                },
                {
                  key: "deleteAnimations",
                  value: function (t) {
                    for (var e = {}, n = 0; n < t.length; n++) {
                      for (
                        var i = t[n],
                          r = this.belongingLaneKeysByAnimationId[i],
                          s = 0;
                        s < r.length;
                        s++
                      ) {
                        for (
                          var a = this.lanes[r[s]], o = -1, u = 0;
                          u < a.length;
                          u++
                        )
                          if (a[u].id === i) {
                            o = u;
                            break;
                          }
                        for (
                          var l = p({}, a[o]),
                            c = this.incidentsById._get(l.id),
                            h = nt(r[s]),
                            d = [],
                            f = 0;
                          f < a.length;
                          f++
                        )
                          a[f].id !== i && d.push(a[f]);
                        if (
                          ((this.lanes[r[s]] = d),
                          0 !== (a = this.lanes[r[s]]).length)
                        ) {
                          e[r[s]] = nt(r[s]);
                          var m = this.incidentsById._get(l.id)
                            .pureInitialValues;
                          if (!(o >= a.length || !1 === m))
                            if (
                              Object.prototype.hasOwnProperty.call(
                                this.comboAttributes,
                                h.attribute
                              )
                            )
                              jr(a, this.incidentsById, m, o, !0);
                            else {
                              var v = this.incidentsById._get(a[o].id);
                              v.setInitialValue(m), v.onGetContext();
                            }
                        } else
                          c.onProgress(0, 0),
                            delete this.lanes[r[s]],
                            Object.prototype.hasOwnProperty.call(e, r[s]) &&
                              delete e[r[s]];
                      }
                      delete this.belongingLaneKeysByAnimationId[t[n]];
                    }
                    return e;
                  },
                },
                {
                  key: "recalcScratchValues",
                  value: function (t) {
                    for (
                      var e = Object.keys(this.lanes), n = 0;
                      n < e.length;
                      n++
                    ) {
                      var i = e[n],
                        r = this.lanes[i];
                      if (r.length > 0) {
                        var s = this.incidentsById._get(r[0].id),
                          a = s.getScratchValue(t),
                          o = nt(i);
                        Object.prototype.hasOwnProperty.call(
                          this.comboAttributes,
                          o.attribute
                        )
                          ? jr(r, this.incidentsById, a, 0, !0)
                          : s.setInitialValue(a),
                          s.lastWish(),
                          s.onGetContext();
                      }
                    }
                  },
                },
              ]),
              t
            );
          })(),
          Nr = (function (t) {
            d(n, t);
            var e = g(n);
            function n(t) {
              var i;
              return (
                o(this, n),
                ((i = e.call(this, t)).comboAttributes = {}),
                (i.fixedAttributeName = "_"),
                null != t.comboAttributes &&
                  (i.comboAttributes = t.comboAttributes),
                (i.LanesHandler = new Vr({
                  comboAttributes: i.comboAttributes,
                })),
                i
              );
            }
            return (
              l(n, [
                {
                  key: "setComboAttributes",
                  value: function (t) {
                    (this.comboAttributes = t),
                      (this.LanesHandler = new Vr({
                        comboAttributes: this.comboAttributes,
                      }));
                  },
                },
                {
                  key: "lanes",
                  get: function () {
                    return this.LanesHandler.lanes;
                  },
                },
                {
                  key: "incidentsById",
                  get: function () {
                    return this.LanesHandler.incidentsById;
                  },
                },
                {
                  key: "_resize",
                  value: function (t) {
                    this.LanesHandler._resize(t);
                  },
                },
                {
                  key: "checkAddition",
                  value: function (t) {
                    for (
                      var e = this,
                        n =
                          arguments.length > 1 && void 0 !== arguments[1]
                            ? arguments[1]
                            : "all-or-nothing",
                        i = this.LanesHandler.createTestLanesSanbox(),
                        r = [],
                        s = [],
                        a = [],
                        o = function (n) {
                          var o = !1,
                            u = t[n],
                            l = u.incident,
                            c = l.mcid,
                            h = l.attribute || e.fixedAttributeName;
                          i.laneExists(c, h), r.push({ mcid: c, attribute: h });
                          var p = i.getOverlappingAnims(u, c, h);
                          if (
                            (p.length > 0 &&
                              ((o = !0),
                              a.push({
                                type:
                                  "unauthorised, overlapping incidents on the same element",
                                meta: {
                                  element_mcid: c,
                                  attribute: h,
                                  incident: u,
                                  overlappingAnims: p,
                                },
                              })),
                            !o)
                          ) {
                            var d = i.addElementToLane(c, h, u.millisecond, l);
                            s.push(function () {
                              for (var t = 0; t < d.length; t++) d[t]();
                              l._onGetContextOnce();
                            });
                          }
                        },
                        u = 0;
                      u < t.length;
                      u++
                    )
                      o(u);
                    if (a.length > 0 && "all-or-nothing" === n)
                      return { result: !1, errors: a };
                    var l = this.LanesHandler,
                      c = function () {
                        for (var t = 0; t < r.length; t++) {
                          var e = st(r[t].mcid, r[t].attribute),
                            n = i.lanes[e].exportFlattened();
                          n.sort(function (t, e) {
                            return t.millisecond - e.millisecond;
                          }),
                            i.lanes.setValue(e, n);
                        }
                        for (var a = 0; a < s.length; a++) s[a]();
                        l.applySandboxChanges(i);
                      };
                    return { result: !0, errors: a, execute: c };
                  },
                },
                {
                  key: "checkEdit",
                  value: function (t, e) {
                    for (var n = [], i = 0; i < t.length; i++) n.push(t[i].id);
                    for (
                      var r = this.LanesHandler.createTestLanesSanbox(),
                        s = [],
                        a = 0;
                      a < t.length;
                      a++
                    )
                      for (
                        var o = t[a].incident.id,
                          u = t[a].incident.mcid,
                          l =
                            t[a].incident.attribute || this.fixedAttributeName,
                          c = r.getLane(u, l),
                          h = 0;
                        h < c.length;
                        h++
                      )
                        if (c[h].id === o) {
                          var d = p({}, c[h]);
                          (d.millisecond += e),
                            (d.incident = r.incidentsById._get(d.id));
                          var f = r.getOverlappingAnims(d, u, l, n);
                          f.length > 0 &&
                            s.push({
                              type:
                                "anauthorised, overlapping animations on the same element",
                              meta: {
                                element_mcid: u,
                                attribute: l,
                                newAnimation: d,
                                overlappingAnims: f,
                              },
                            });
                          break;
                        }
                    if (s.length > 0) return { result: !1, errors: s };
                    var m = this;
                    return {
                      result: !0,
                      execute: function () {
                        m.LanesHandler.updateLane(n, e);
                      },
                    };
                  },
                },
                {
                  key: "checkResizedIncidents",
                  value: function (t) {
                    for (
                      var e =
                          arguments.length > 1 &&
                          void 0 !== arguments[1] &&
                          arguments[1],
                        n = [],
                        i = 0;
                      i < t.length;
                      i++
                    )
                      n.push(t[i].id);
                    for (
                      var r = this.LanesHandler.createTestLanesSanbox(),
                        s = [],
                        a = 0;
                      a < t.length;
                      a++
                    )
                      for (
                        var o = this.LanesHandler.incidentsById._get(t[a].id),
                          u = o.mcid,
                          l = o.attribute || this.fixedAttributeName,
                          c = r.getLane(u, l),
                          h = { mcid: u, attribute: l },
                          d = t[a].end - t[a].start,
                          f = 0;
                        f < c.length;
                        f++
                      )
                        if (c[f].id === t[a].id) {
                          if (!e) {
                            var m = c[f],
                              v = p({}, m);
                            (v.millisecond += t[a].startDelta),
                              (v.incident = r.incidentsById._get(v.id));
                            var y = r.getOverlappingAnims(
                              v,
                              h.mcid,
                              h.attribute,
                              n,
                              d
                            );
                            y.length > 0 &&
                              s.push({
                                type:
                                  "anauthorised overlapping animations on the same element",
                                meta: {
                                  element_mcid: h.mcid,
                                  attribute: h.attribute,
                                  newAnimation: v,
                                  overlappingAnims: y,
                                },
                              });
                          }
                          break;
                        }
                    if (s.length > 0) return { result: !1, errors: s };
                    var g = this,
                      b = function () {
                        for (var e = 0; e < t.length; e++)
                          g.LanesHandler.updateLane([t[e].id], t[e].startDelta);
                      };
                    return { execute: b, result: !0 };
                  },
                },
                {
                  key: "checkDelete",
                  value: function (t) {
                    for (var e = [], n = 0; n < t.length; n++) e.push(t[n].id);
                    var i = this;
                    return {
                      result: !0,
                      execute: function () {
                        i.LanesHandler.deleteAnimations(e);
                      },
                    };
                  },
                },
                {
                  key: "recalcScratchValues",
                  value: function (t) {
                    this.LanesHandler.recalcScratchValues(t);
                  },
                },
                {
                  key: "slipIntoLaneForwards",
                  value: function (t, e, n, i) {
                    var r = this,
                      s =
                        arguments.length > 4 &&
                        void 0 !== arguments[4] &&
                        arguments[4],
                      a = t.filter(function (t) {
                        var i =
                          r.incidentsById._get(t.id).duration + t.millisecond;
                        return (
                          (i >= e && i <= n) || (i >= n && t.millisecond <= n)
                        );
                      });
                    if (0 === a.length) {
                      if (s && 0 === e) {
                        var o = this.incidentsById._get(t[0].id);
                        o.onProgress(0, 0, i);
                      }
                      return !0;
                    }
                    var u = a.length - 1,
                      l = this.incidentsById._get(a[u].id),
                      c = a[u].millisecond,
                      h = 1,
                      p = l.duration;
                    l.duration + c > n && (h = (p = n - c) / l.duration),
                      l.onProgress(h, p, i);
                  },
                },
                {
                  key: "slipToLaneBackwards",
                  value: function (t, e, n, i) {
                    var r = this,
                      s = t.filter(function (t) {
                        var i =
                          r.incidentsById._get(t.id).duration + t.millisecond;
                        return (
                          (i <= n && i >= e) ||
                          (t.millisecond >= e && t.millisecond <= n) ||
                          (t.millisecond < e && i > n)
                        );
                      });
                    if (0 === s.length) return !0;
                    var a = this.incidentsById._get(s[0].id),
                      o = s[0].millisecond,
                      u = 0,
                      l = 0;
                    o < n && ((u = (n - o) / a.duration), (l = n - o)),
                      a.onProgress(u, l, i);
                  },
                },
                {
                  key: "moveTo",
                  value: function (t, e, n) {
                    for (
                      var i =
                          arguments.length > 3 &&
                          void 0 !== arguments[3] &&
                          arguments[3],
                        r = Object.keys(this.lanes),
                        s = 0;
                      s < r.length;
                      s++
                    ) {
                      var a = this.lanes[r[s]];
                      t <= e
                        ? this.slipIntoLaneForwards(a, t, e, n, i)
                        : this.slipToLaneBackwards(a, t, e, n, i);
                    }
                  },
                },
              ]),
              n
            );
          })(lt);
        c(Nr, "type", "attributes");
        var $r = (function () {
            function t() {
              o(this, t), (this.customEntities = {});
            }
            return (
              l(t, [
                {
                  key: "calcClipDims",
                  value: function (t) {
                    var e = { use: !1, width: null, height: null };
                    return Object.prototype.hasOwnProperty.call(
                      t,
                      "originalDims"
                    ) &&
                      null !== t.originalDims.width &&
                      void 0 !== t.originalDims.width &&
                      null !== t.originalDims.height &&
                      void 0 !== t.originalDims.height
                      ? {
                          use: !0,
                          width:
                            t.originalDims.width.number +
                            t.originalDims.width.unit,
                          height:
                            t.originalDims.height.number +
                            t.originalDims.height.unit,
                        }
                      : (Object.prototype.hasOwnProperty.call(
                          t,
                          "containerParams"
                        ) &&
                          (Object.prototype.hasOwnProperty.call(
                            t.containerParams,
                            "width"
                          ) &&
                            ((e.use = !0), (e.width = t.containerParams.width)),
                          Object.prototype.hasOwnProperty.call(
                            t.containerParams,
                            "height"
                          ) &&
                            ((e.use = !0),
                            (e.height = t.containerParams.height))),
                        e);
                  },
                },
                {
                  key: "scalingCalculator",
                  value: function (t) {
                    if (
                      !Object.prototype.hasOwnProperty.call(
                        t,
                        "containerParams"
                      ) ||
                      !Object.prototype.hasOwnProperty.call(t, "originalDims")
                    )
                      return { width: 1, height: 1 };
                    if (
                      !(
                        (null !== t.originalDims.width &&
                          void 0 !== t.originalDims.width) ||
                        (null !== t.originalDims.height &&
                          void 0 !== t.originalDims.height)
                      )
                    )
                      return { width: 1, height: 1 };
                    var e = Y(t.containerParams),
                      n = null,
                      i = null;
                    return (
                      null !== e.width &&
                        null !== t.originalDims.width &&
                        (e.width.unit === t.originalDims.width.unit
                          ? (n = e.width.number / t.originalDims.width.number)
                          : ot.warning(
                              "containerParams and originalDims width of Incident have different dimensions.\n          containerParams.width will be ignored"
                            )),
                      null !== e.height &&
                        null !== t.originalDims.height &&
                        (e.height.unit === t.originalDims.height.unit
                          ? (i = e.height.number / t.originalDims.height.number)
                          : ot.warning(
                              "containerParams and originalDims height of Incident have different dimensions.\n          containerParams.width will be ignored"
                            )),
                      null === n && null === i
                        ? { width: 1, height: 1 }
                        : ((null !== n) & (null === i)
                            ? (i = n)
                            : (null !== i) & (null === n) && (n = i),
                          { width: n, height: i })
                    );
                  },
                },
                {
                  key: "getElementByMCID",
                  value: function (t) {
                    if (
                      Object.prototype.hasOwnProperty.call(
                        this.customEntities,
                        t
                      )
                    )
                      return this.customEntities[t];
                    if (
                      Object.prototype.hasOwnProperty.call(
                        this.elementsByMCID,
                        t
                      )
                    )
                      return this.elementsByMCID[t];
                    var e = this.context.rootElement.querySelector(
                      this.getElementSelectorByMCID(t)
                    );
                    return (this.elementsByMCID[t] = e), e;
                  },
                },
                {
                  key: "getElements",
                  value: function (t) {
                    if (null == t || "" === t) return [];
                    if ("!" === t.charAt(0)) {
                      if ("#" === (t = t.substr(1)).charAt(0))
                        return [this.customEntities[t.substr(1)]];
                      if ("." === t.charAt(0)) {
                        var e = [];
                        for (var n in this.customEntities) {
                          var i = this.customEntities[n];
                          i.classes.indexOf(t.substr(1)) > -1 && e.push(i);
                        }
                        return e;
                      }
                    }
                    return Array.from(
                      this.context.rootElement.querySelectorAll(t)
                    );
                  },
                },
                {
                  key: "getMCID",
                  value: function (t) {
                    return !0 === t.customEntity ? t.id : t.getAttribute(L);
                  },
                },
                {
                  key: "setMCID",
                  value: function (t, e) {
                    t.setAttribute(L, e);
                  },
                },
                {
                  key: "getElementSelectorByMCID",
                  value: function (t) {
                    return Object.prototype.hasOwnProperty.call(
                      this.customEntities,
                      t
                    )
                      ? "!#".concat(t)
                      : "[".concat(L, '="').concat(t, '"]');
                  },
                },
                {
                  key: "setCustomEntity",
                  value: function (t, e) {
                    var n =
                      arguments.length > 2 && void 0 !== arguments[2]
                        ? arguments[2]
                        : [];
                    return Object.prototype.hasOwnProperty.call(
                      this.customEntities,
                      t
                    )
                      ? (ot.error(
                          "Clip "
                            .concat(
                              this.id,
                              " already has custom Entity with id: "
                            )
                            .concat(t)
                        ),
                        !1)
                      : ((this.customEntities[t] = {
                          id: t,
                          entity: e,
                          classes: n,
                          customEntity: !0,
                        }),
                        !0);
                  },
                },
              ]),
              t
            );
          })(),
          Br = Ae(function (t, e) {
            var n = /[|\\{}()[\]^$+*?.]/g;
            e.escapeRegExpChars = function (t) {
              return t ? String(t).replace(n, "\\$&") : "";
            };
            var i = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&#34;",
                "'": "&#39;",
              },
              r = /[&<>'"]/g;
            function s(t) {
              return i[t] || t;
            }
            (e.escapeXML = function (t) {
              return null == t ? "" : String(t).replace(r, s);
            }),
              (e.escapeXML.toString = function () {
                return (
                  Function.prototype.toString.call(this) +
                  ';\nvar _ENCODE_HTML_RULES = {\n      "&": "&amp;"\n    , "<": "&lt;"\n    , ">": "&gt;"\n    , \'"\': "&#34;"\n    , "\'": "&#39;"\n    }\n  , _MATCH_HTML = /[&<>\'"]/g;\nfunction encode_char(c) {\n  return _ENCODE_HTML_RULES[c] || c;\n};\n'
                );
              }),
              (e.shallowCopy = function (t, e) {
                for (var n in (e = e || {})) t[n] = e[n];
                return t;
              }),
              (e.shallowCopyFromList = function (t, e, n) {
                for (var i = 0; i < n.length; i++) {
                  var r = n[i];
                  void 0 !== e[r] && (t[r] = e[r]);
                }
                return t;
              }),
              (e.cache = {
                _data: {},
                set: function (t, e) {
                  this._data[t] = e;
                },
                get: function (t) {
                  return this._data[t];
                },
                remove: function (t) {
                  delete this._data[t];
                },
                reset: function () {
                  this._data = {};
                },
              }),
              (e.hyphenToCamel = function (t) {
                return t.replace(/-[a-z]/g, function (t) {
                  return t[1].toUpperCase();
                });
              });
          }),
          Lr = "3.1.6",
          Fr = Ae(function (t, e) {
            /**
             * @file Embedded JavaScript templating engine. {@link http://ejs.co}
             * @author Matthew Eernisse <mde@fleegix.org>
             * @author Tiancheng "Timothy" Gu <timothygu99@gmail.com>
             * @project EJS
             * @license {@link http://www.apache.org/licenses/LICENSE-2.0 Apache License, Version 2.0}
             */
            var n = s.default,
              i = !1,
              a = Lr,
              o = "locals",
              u = [
                "delimiter",
                "scope",
                "context",
                "debug",
                "compileDebug",
                "client",
                "_with",
                "rmWhitespace",
                "strict",
                "filename",
                "async",
              ],
              l = u.concat("cache"),
              c = /^\uFEFF/;
            function h(t, n) {
              var i;
              if (
                n.some(function (n) {
                  return (
                    (i = e.resolveInclude(t, n, !0)), r.default.existsSync(i)
                  );
                })
              )
                return i;
            }
            function p(t, n) {
              var i,
                r = t.filename,
                s = arguments.length > 1;
              if (t.cache) {
                if (!r) throw new Error("cache option requires a filename");
                if ((i = e.cache.get(r))) return i;
                s || (n = f(r).toString().replace(c, ""));
              } else if (!s) {
                if (!r)
                  throw new Error(
                    "Internal EJS error: no file name or template provided"
                  );
                n = f(r).toString().replace(c, "");
              }
              return (i = e.compile(n, t)), t.cache && e.cache.set(r, i), i;
            }
            function d(t, n, i) {
              var r;
              if (!i) {
                if ("function" == typeof e.promiseImpl)
                  return new e.promiseImpl(function (e, i) {
                    try {
                      e((r = p(t)(n)));
                    } catch (t) {
                      i(t);
                    }
                  });
                throw new Error("Please provide a callback function");
              }
              try {
                r = p(t)(n);
              } catch (t) {
                return i(t);
              }
              i(null, r);
            }
            function f(t) {
              return e.fileLoader(t);
            }
            function m(t, n) {
              var i = Br.shallowCopy({}, n);
              if (
                ((i.filename = (function (t, n) {
                  var i,
                    s,
                    a = n.views,
                    o = /^[A-Za-z]+:\\|^\//.exec(t);
                  if (o && o.length)
                    (t = t.replace(/^\/*/, "")),
                      (i = Array.isArray(n.root)
                        ? h(t, n.root)
                        : e.resolveInclude(t, n.root || "/", !0));
                  else if (
                    (n.filename &&
                      ((s = e.resolveInclude(t, n.filename)),
                      r.default.existsSync(s) && (i = s)),
                    !i && Array.isArray(a) && (i = h(t, a)),
                    !i && "function" != typeof n.includer)
                  )
                    throw new Error(
                      'Could not find the include file "' +
                        n.escapeFunction(t) +
                        '"'
                    );
                  return i;
                })(t, i)),
                "function" == typeof n.includer)
              ) {
                var s = n.includer(t, i.filename);
                if (s && (s.filename && (i.filename = s.filename), s.template))
                  return p(i, s.template);
              }
              return p(i);
            }
            function v(t, e, n, i, r) {
              var s = e.split("\n"),
                a = Math.max(i - 3, 0),
                o = Math.min(s.length, i + 3),
                u = r(n),
                l = s
                  .slice(a, o)
                  .map(function (t, e) {
                    var n = e + a + 1;
                    return (n == i ? " >> " : "    ") + n + "| " + t;
                  })
                  .join("\n");
              throw (
                ((t.path = u),
                (t.message =
                  (u || "ejs") + ":" + i + "\n" + l + "\n\n" + t.message),
                t)
              );
            }
            function y(t) {
              return t.replace(/;(\s*$)/, "$1");
            }
            function g(t, n) {
              n = n || {};
              var i = {};
              (this.templateText = t),
                (this.mode = null),
                (this.truncate = !1),
                (this.currentLine = 1),
                (this.source = ""),
                (i.client = n.client || !1),
                (i.escapeFunction =
                  n.escape || n.escapeFunction || Br.escapeXML),
                (i.compileDebug = !1 !== n.compileDebug),
                (i.debug = !!n.debug),
                (i.filename = n.filename),
                (i.openDelimiter = n.openDelimiter || e.openDelimiter || "<"),
                (i.closeDelimiter =
                  n.closeDelimiter || e.closeDelimiter || ">"),
                (i.delimiter = n.delimiter || e.delimiter || "%"),
                (i.strict = n.strict || !1),
                (i.context = n.context),
                (i.cache = n.cache || !1),
                (i.rmWhitespace = n.rmWhitespace),
                (i.root = n.root),
                (i.includer = n.includer),
                (i.outputFunctionName = n.outputFunctionName),
                (i.localsName = n.localsName || e.localsName || o),
                (i.views = n.views),
                (i.async = n.async),
                (i.destructuredLocals = n.destructuredLocals),
                (i.legacyInclude =
                  void 0 === n.legacyInclude || !!n.legacyInclude),
                i.strict
                  ? (i._with = !1)
                  : (i._with = void 0 === n._with || n._with),
                (this.opts = i),
                (this.regex = this.createRegex());
            }
            (e.cache = Br.cache),
              (e.fileLoader = r.default.readFileSync),
              (e.localsName = o),
              (e.promiseImpl = new Function("return this;")().Promise),
              (e.resolveInclude = function (t, e, i) {
                var r = n.dirname,
                  s = n.extname,
                  a = (0, n.resolve)(i ? e : r(e), t);
                return s(t) || (a += ".ejs"), a;
              }),
              (e.compile = function (t, e) {
                return (
                  e &&
                    e.scope &&
                    (i ||
                      (console.warn(
                        "`scope` option is deprecated and will be removed in EJS 3"
                      ),
                      (i = !0)),
                    e.context || (e.context = e.scope),
                    delete e.scope),
                  new g(t, e).compile()
                );
              }),
              (e.render = function (t, e, n) {
                var i = e || {},
                  r = n || {};
                return (
                  2 == arguments.length && Br.shallowCopyFromList(r, i, u),
                  p(r, t)(i)
                );
              }),
              (e.renderFile = function () {
                var t,
                  e,
                  n,
                  i = Array.prototype.slice.call(arguments),
                  r = i.shift(),
                  s = { filename: r };
                return (
                  "function" == typeof arguments[arguments.length - 1] &&
                    (t = i.pop()),
                  i.length
                    ? ((e = i.shift()),
                      i.length
                        ? Br.shallowCopy(s, i.pop())
                        : (e.settings &&
                            (e.settings.views && (s.views = e.settings.views),
                            e.settings["view cache"] && (s.cache = !0),
                            (n = e.settings["view options"]) &&
                              Br.shallowCopy(s, n)),
                          Br.shallowCopyFromList(s, e, l)),
                      (s.filename = r))
                    : (e = {}),
                  d(s, e, t)
                );
              }),
              (e.Template = g),
              (e.clearCache = function () {
                e.cache.reset();
              }),
              (g.modes = {
                EVAL: "eval",
                ESCAPED: "escaped",
                RAW: "raw",
                COMMENT: "comment",
                LITERAL: "literal",
              }),
              (g.prototype = {
                createRegex: function () {
                  var t = "(<%%|%%>|<%=|<%-|<%_|<%#|<%|%>|-%>|_%>)",
                    e = Br.escapeRegExpChars(this.opts.delimiter),
                    n = Br.escapeRegExpChars(this.opts.openDelimiter),
                    i = Br.escapeRegExpChars(this.opts.closeDelimiter);
                  return (
                    (t = t.replace(/%/g, e).replace(/</g, n).replace(/>/g, i)),
                    new RegExp(t)
                  );
                },
                compile: function () {
                  var t,
                    e,
                    i,
                    r = this.opts,
                    s = "",
                    a = "",
                    o = r.escapeFunction,
                    u = r.filename ? JSON.stringify(r.filename) : "undefined";
                  if (!this.source) {
                    if (
                      (this.generateSource(),
                      (s +=
                        '  var __output = "";\n  function __append(s) { if (s !== undefined && s !== null) __output += s }\n'),
                      r.outputFunctionName &&
                        (s +=
                          "  var " + r.outputFunctionName + " = __append;\n"),
                      r.destructuredLocals && r.destructuredLocals.length)
                    ) {
                      for (
                        var l =
                            "  var __locals = (" + r.localsName + " || {}),\n",
                          c = 0;
                        c < r.destructuredLocals.length;
                        c++
                      ) {
                        var h = r.destructuredLocals[c];
                        c > 0 && (l += ",\n  "), (l += h + " = __locals." + h);
                      }
                      s += l + ";\n";
                    }
                    !1 !== r._with &&
                      ((s += "  with (" + r.localsName + " || {}) {\n"),
                      (a += "  }\n")),
                      (a += "  return __output;\n"),
                      (this.source = s + this.source + a);
                  }
                  (t = r.compileDebug
                    ? "var __line = 1\n  , __lines = " +
                      JSON.stringify(this.templateText) +
                      "\n  , __filename = " +
                      u +
                      ";\ntry {\n" +
                      this.source +
                      "} catch (e) {\n  rethrow(e, __lines, __filename, __line, escapeFn);\n}\n"
                    : this.source),
                    r.client &&
                      ((t =
                        "escapeFn = escapeFn || " + o.toString() + ";\n" + t),
                      r.compileDebug &&
                        (t =
                          "rethrow = rethrow || " + v.toString() + ";\n" + t)),
                    r.strict && (t = '"use strict";\n' + t),
                    r.debug && console.log(t),
                    r.compileDebug &&
                      r.filename &&
                      (t = t + "\n//# sourceURL=" + u + "\n");
                  try {
                    if (r.async)
                      try {
                        i = new Function(
                          "return (async function(){}).constructor;"
                        )();
                      } catch (t) {
                        throw t instanceof SyntaxError
                          ? new Error(
                              "This environment does not support async/await"
                            )
                          : t;
                      }
                    else i = Function;
                    e = new i(r.localsName + ", escapeFn, include, rethrow", t);
                  } catch (t) {
                    throw (
                      (t instanceof SyntaxError &&
                        (r.filename && (t.message += " in " + r.filename),
                        (t.message += " while compiling ejs\n\n"),
                        (t.message +=
                          "If the above error is not helpful, you may want to try EJS-Lint:\n"),
                        (t.message += "https://github.com/RyanZim/EJS-Lint"),
                        r.async ||
                          ((t.message += "\n"),
                          (t.message +=
                            "Or, if you meant to create an async function, pass `async: true` as an option."))),
                      t)
                    );
                  }
                  var p = r.client
                    ? e
                    : function (t) {
                        return e.apply(r.context, [
                          t || {},
                          o,
                          function (e, n) {
                            var i = Br.shallowCopy({}, t);
                            return n && (i = Br.shallowCopy(i, n)), m(e, r)(i);
                          },
                          v,
                        ]);
                      };
                  if (
                    r.filename &&
                    "function" == typeof Object.defineProperty
                  ) {
                    var d = r.filename,
                      f = n.basename(d, n.extname(d));
                    try {
                      Object.defineProperty(p, "name", {
                        value: f,
                        writable: !1,
                        enumerable: !1,
                        configurable: !0,
                      });
                    } catch (t) {}
                  }
                  return p;
                },
                generateSource: function () {
                  this.opts.rmWhitespace &&
                    (this.templateText = this.templateText
                      .replace(/[\r\n]+/g, "\n")
                      .replace(/^\s+|\s+$/gm, "")),
                    (this.templateText = this.templateText
                      .replace(/[ \t]*<%_/gm, "<%_")
                      .replace(/_%>[ \t]*/gm, "_%>"));
                  var t = this,
                    e = this.parseTemplateText(),
                    n = this.opts.delimiter,
                    i = this.opts.openDelimiter,
                    r = this.opts.closeDelimiter;
                  e &&
                    e.length &&
                    e.forEach(function (s, a) {
                      var o;
                      if (
                        0 === s.indexOf(i + n) &&
                        0 !== s.indexOf(i + n + n) &&
                        (o = e[a + 2]) != n + r &&
                        o != "-" + n + r &&
                        o != "_" + n + r
                      )
                        throw new Error(
                          'Could not find matching close tag for "' + s + '".'
                        );
                      t.scanLine(s);
                    });
                },
                parseTemplateText: function () {
                  for (
                    var t,
                      e = this.templateText,
                      n = this.regex,
                      i = n.exec(e),
                      r = [];
                    i;

                  )
                    0 !== (t = i.index) &&
                      (r.push(e.substring(0, t)), (e = e.slice(t))),
                      r.push(i[0]),
                      (e = e.slice(i[0].length)),
                      (i = n.exec(e));
                  return e && r.push(e), r;
                },
                _addOutput: function (t) {
                  if (
                    (this.truncate &&
                      ((t = t.replace(/^(?:\r\n|\r|\n)/, "")),
                      (this.truncate = !1)),
                    !t)
                  )
                    return t;
                  (t = (t = (t = (t = t.replace(/\\/g, "\\\\")).replace(
                    /\n/g,
                    "\\n"
                  )).replace(/\r/g, "\\r")).replace(/"/g, '\\"')),
                    (this.source += '    ; __append("' + t + '")\n');
                },
                scanLine: function (t) {
                  var e,
                    n = this.opts.delimiter,
                    i = this.opts.openDelimiter,
                    r = this.opts.closeDelimiter;
                  switch (((e = t.split("\n").length - 1), t)) {
                    case i + n:
                    case i + n + "_":
                      this.mode = g.modes.EVAL;
                      break;
                    case i + n + "=":
                      this.mode = g.modes.ESCAPED;
                      break;
                    case i + n + "-":
                      this.mode = g.modes.RAW;
                      break;
                    case i + n + "#":
                      this.mode = g.modes.COMMENT;
                      break;
                    case i + n + n:
                      (this.mode = g.modes.LITERAL),
                        (this.source +=
                          '    ; __append("' +
                          t.replace(i + n + n, i + n) +
                          '")\n');
                      break;
                    case n + n + r:
                      (this.mode = g.modes.LITERAL),
                        (this.source +=
                          '    ; __append("' +
                          t.replace(n + n + r, n + r) +
                          '")\n');
                      break;
                    case n + r:
                    case "-" + n + r:
                    case "_" + n + r:
                      this.mode == g.modes.LITERAL && this._addOutput(t),
                        (this.mode = null),
                        (this.truncate =
                          0 === t.indexOf("-") || 0 === t.indexOf("_"));
                      break;
                    default:
                      if (this.mode) {
                        switch (this.mode) {
                          case g.modes.EVAL:
                          case g.modes.ESCAPED:
                          case g.modes.RAW:
                            t.lastIndexOf("//") > t.lastIndexOf("\n") &&
                              (t += "\n");
                        }
                        switch (this.mode) {
                          case g.modes.EVAL:
                            this.source += "    ; " + t + "\n";
                            break;
                          case g.modes.ESCAPED:
                            this.source +=
                              "    ; __append(escapeFn(" + y(t) + "))\n";
                            break;
                          case g.modes.RAW:
                            this.source += "    ; __append(" + y(t) + ")\n";
                            break;
                          case g.modes.COMMENT:
                            break;
                          case g.modes.LITERAL:
                            this._addOutput(t);
                        }
                      } else this._addOutput(t);
                  }
                  this.opts.compileDebug &&
                    e &&
                    ((this.currentLine += e),
                    (this.source +=
                      "    ; __line = " + this.currentLine + "\n"));
                },
              }),
              (e.escapeXML = Br.escapeXML),
              (e.__express = e.renderFile),
              (e.VERSION = a),
              (e.name = "ejs"),
              "undefined" != typeof window && (window.ejs = e);
          });
        function Rr(t, e) {
          return U(t) ? t(e) : Fr.render(t, { initParams: e });
        }
        var zr = (function (t) {
            d(n, t);
            var e = g(n);
            function n() {
              var t,
                i =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : {};
              if ((o(this, n), (t = e.call(this)), !H(i)))
                return (
                  ot.error(
                    "ContextHandler expects an object on its constructor. ".concat(
                      a(i),
                      " passed"
                    )
                  ),
                  y(t, !1)
                );
              if (!Object.prototype.hasOwnProperty.call(i, "html"))
                return (
                  ot.error(
                    "ContextHandler expects the html key on its constructor properties which is missing"
                  ),
                  y(t, !1)
                );
              if (!Object.prototype.hasOwnProperty.call(i, "css"))
                return (
                  ot.error(
                    "ContextHandler expects the css key on its constructor properties which is missing"
                  ),
                  y(t, !1)
                );
              if (
                (Object.prototype.hasOwnProperty.call(i, "initParams") ||
                  ot.info("ContextHandler got null initParams"),
                !Object.prototype.hasOwnProperty.call(i, "host"))
              )
                return (
                  ot.error(
                    "ContextHandler expects the host key on its constructor properties which is missing"
                  ),
                  y(t, !1)
                );
              t.isDOM = !0;
              var r = i.host.ownerDocument;
              if (
                !r.getElementById(
                  "@kissmybutton/motorcortex/iframeContextHandler/css"
                )
              ) {
                var s =
                    "\n            iframe[seamless]{\n                background-color: transparent;\n                border: 0px none transparent;\n                padding: 0px;\n                overflow: hidden;\n            }\n            ",
                  u = r.createElement("style");
                (u.id = "@kissmybutton/motorcortex/iframeContextHandler/css"),
                  (u.type = "text/css");
                var l = r.head || r.getElementsByTagName("head")[0];
                u.styleSheet
                  ? (u.styleSheet.cssText = s)
                  : u.appendChild(r.createTextNode(s)),
                  l.appendChild(u);
              }
              var c = r.createElement("iframe");
              i.host.appendChild(c);
              var h = t.scalingCalculator(i),
                p = t.calcClipDims(i);
              c.setAttribute("seamless", "seamless"),
                !0 === p.use &&
                  (null !== p.width && c.setAttribute("width", p.width),
                  null !== p.height && c.setAttribute("height", p.height)),
                (c.style.transform = "scale("
                  .concat(h.width, ", ")
                  .concat(h.height, ")")),
                (c.style.transformOrigin = "top left"),
                (c.style.position = "absolute"),
                (c.src = "");
              var d = c.contentWindow || c.contentDocument;
              d.document && (d = d.document), d.write(Rr(i.html, i.initParams));
              var f =
                  "\n        body{\n            padding:0;\n            margin:0;\n        }\n        ",
                m = d.createElement("style");
              (m.type = "text/css"),
                m.styleSheet
                  ? (m.styleSheet.cssText = Rr(i.css, i.initParams) + f)
                  : m.appendChild(
                      r.createTextNode(Rr(i.css, i.initParams) + f)
                    );
              var g = d.head || d.getElementsByTagName("head")[0];
              if (
                (g.appendChild(m),
                Object.prototype.hasOwnProperty.call(i, "fonts"))
              )
                for (var b = 0; b < i.fonts.length; b++) {
                  var k = i.fonts[b];
                  if ("google-font" === k.type) {
                    var x = d.createElement("link");
                    x.setAttribute("rel", "stylesheet"),
                      x.setAttribute("href", k.src),
                      g.appendChild(x);
                  }
                }
              return (
                (t.rootElement = c),
                d.close(),
                (t.context = {
                  document: d,
                  window: c.contentWindow || c,
                  clipContainer: c,
                  rootElement: d.body,
                  unmount: function () {
                    i.host.removeChild(c);
                  },
                  getElements: t.getElements.bind(v(t)),
                  getMCID: t.getMCID.bind(v(t)),
                  setMCID: t.setMCID.bind(v(t)),
                  getElementSelectorByMCID: t.getElementSelectorByMCID.bind(
                    v(t)
                  ),
                  getElementByMCID: t.getElementByMCID.bind(v(t)),
                  setCustomEntity: t.setCustomEntity.bind(v(t)),
                }),
                (t.elementsByMCID = {}),
                t
              );
            }
            return n;
          })($r),
          Gr = (function (t) {
            d(n, t);
            var e = g(n);
            function n() {
              var t,
                i =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : {};
              if ((o(this, n), (t = e.call(this)), !H(i)))
                return (
                  ot.error(
                    "ContextHandler expects an object on its constructor. ".concat(
                      a(i),
                      " passed"
                    )
                  ),
                  y(t, !1)
                );
              if (!Object.prototype.hasOwnProperty.call(i, "html"))
                return (
                  ot.error(
                    "ContextHandler expects the html key on its constructor properties which is missing"
                  ),
                  y(t, !1)
                );
              if (!Object.prototype.hasOwnProperty.call(i, "css"))
                return (
                  ot.error(
                    "ContextHandler expects the css key on its constructor properties which is missing"
                  ),
                  y(t, !1)
                );
              if (!Object.prototype.hasOwnProperty.call(i, "host"))
                return (
                  ot.error(
                    "ContextHandler expects the host key on its constructor properties which is missing"
                  ),
                  y(t, !1)
                );
              t.isDOM = !0;
              var r = i.host.shadowRoot;
              r || (r = i.host.attachShadow({ mode: "open" }));
              var s = document.createElement("div"),
                u = t.scalingCalculator(i),
                l = t.calcClipDims(i);
              s.setAttribute("data-motorocortex-container", "true"),
                !0 === l.use &&
                  (null !== l.width && (s.style.width = l.width),
                  null !== l.height && (s.style.height = l.height)),
                (s.style.transform = "scale("
                  .concat(u.width, ", ")
                  .concat(u.height, ")")),
                (s.style.transformOrigin = "top left"),
                (s.style.position = "absolute"),
                (s.style.overflow = "hidden"),
                (s.innerHTML = Rr(i.html, i.initParams)),
                r.appendChild(s);
              var c = document.createElement("slot");
              r.appendChild(c);
              var h = document.createElement("style");
              if (
                ((h.type = "text/css"),
                h.styleSheet
                  ? (h.styleSheet.cssText = Rr(i.css, i.initParams))
                  : h.appendChild(
                      document.createTextNode(
                        "[data-motorocortex-container] { all: initial; }" +
                          Rr(i.css, i.initParams)
                      )
                    ),
                r.appendChild(h),
                (t.fontTags = []),
                Object.prototype.hasOwnProperty.call(i, "fonts"))
              )
                for (var p = 0; p < i.fonts.length; p++) {
                  var d = i.fonts[p];
                  if ("google-font" === d.type) {
                    var f = document.createElement("link");
                    f.setAttribute("rel", "stylesheet"),
                      f.setAttribute("href", d.src),
                      document.getElementsByTagName("head")[0].appendChild(f),
                      t.fontTags.push(f);
                  }
                }
              return (
                (s.style.overflow = "hidden"),
                (t.rootElement = s),
                (t.context = {
                  document: document,
                  window: window,
                  clipContainer: t.rootElement,
                  rootElement: s,
                  unmount: function () {
                    try {
                      r.innerHTML = "";
                      for (var t = 0; t < this.fontTags.length; t++)
                        document
                          .getElementsByTagName("head")[0]
                          .removeChild(this.fontTags[t]);
                    } catch (t) {
                      ot.warning(
                        "The element of the Clip to be removed seems not to exist any more"
                      );
                    }
                  },
                  getElements: t.getElements.bind(v(t)),
                  getMCID: t.getMCID.bind(v(t)),
                  setMCID: t.setMCID.bind(v(t)),
                  getElementSelectorByMCID: t.getElementSelectorByMCID.bind(
                    v(t)
                  ),
                  getElementByMCID: t.getElementByMCID.bind(v(t)),
                  setCustomEntity: t.setCustomEntity.bind(v(t)),
                }),
                (t.elementsByMCID = {}),
                t
              );
            }
            return n;
          })($r),
          qr = (function (t) {
            d(n, t);
            var e = g(n);
            function n() {
              var t,
                i,
                r,
                s =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : {},
                a =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : null;
              o(this, n),
                null === a ? ((i = {}), (r = s)) : ((i = s), (r = a)),
                (t = e.call(this, i, r)),
                (r = p(
                  p({}, r),
                  {},
                  {
                    html: "" !== t.html ? t.html : r.html,
                    css: "" !== t.css ? t.css : r.css,
                    fonts: t.fonts.length > 0 ? t.fonts : r.fonts,
                  }
                ));
              var u = F;
              t.clipType = u;
              var l = new (document.head.createShadowRoot ||
              document.head.attachShadow
                ? Gr
                : zr)(r);
              return (
                (t.ownContext = p(
                  p({}, l.context),
                  {},
                  { isHostedClip: t.isHostedClip, initParams: r.initParams }
                )),
                (t.iframe = l.iframeElement),
                (t.forceExportIncidents = !0),
                t.onAfterRender(),
                t
              );
            }
            return (
              l(n, [
                { key: "onAfterRender", value: function () {} },
                {
                  key: "html",
                  get: function () {
                    return "";
                  },
                },
                {
                  key: "css",
                  get: function () {
                    return "";
                  },
                },
                {
                  key: "fonts",
                  get: function () {
                    return [];
                  },
                },
                {
                  key: "rootElement",
                  get: function () {
                    return this.context.clipContainer;
                  },
                },
                {
                  key: "exportConstructionArguments",
                  value: function () {
                    return {
                      attrs: this.attrs,
                      props: p(
                        p({}, this.props),
                        {},
                        {
                          host: void 0,
                          html:
                            !0 ===
                            this.DescriptiveIncident.constructor.customClip
                              ? ""
                              : this.context.rootElement.innerHTML,
                        }
                      ),
                    };
                  },
                },
                {
                  key: "setCustomEntity",
                  value: function (t, e) {
                    var n =
                      arguments.length > 2 && void 0 !== arguments[2]
                        ? arguments[2]
                        : [];
                    return this.context.setCustomEntity(t, e, n);
                  },
                },
              ]),
              n
            );
          })(br),
          Kr = (function (t) {
            d(n, t);
            var e = g(n);
            function n() {
              var t,
                i =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : {};
              o(this, n), (t = e.call(this));
              var r = p({}, i);
              if (!H(r))
                return (
                  ot.error(
                    "HTMLFragmentContextHandler expects an object on its constructor. ".concat(
                      a(r),
                      " passed"
                    )
                  ),
                  y(t, !1)
                );
              Object.prototype.hasOwnProperty.call(r, "html") || (r.html = ""),
                (t.isDOM = !0);
              var s = document.createDocumentFragment(),
                u = document.createElement("div");
              return (
                Object.prototype.hasOwnProperty.call(r, "containerParams") &&
                  (Object.prototype.hasOwnProperty.call(r, "width") &&
                    (u.style.width = r.containerParams.width),
                  Object.prototype.hasOwnProperty.call(r, "height") &&
                    (u.style.height = r.containerParams.height)),
                (u.innerHTML = Rr(r.html, r.initParams)),
                s.appendChild(u),
                (u.style.overflow = "hidden"),
                (t.rootElement = u),
                (t.context = {
                  document: document,
                  window: window,
                  clipContainer: t.rootElement,
                  rootElement: u,
                  unmount: function () {
                    r.host.removeChild(s);
                  },
                  getElements: t.getElements.bind(v(t)),
                  getMCID: t.getMCID.bind(v(t)),
                  setMCID: t.setMCID.bind(v(t)),
                  getElementSelectorByMCID: t.getElementSelectorByMCID.bind(
                    v(t)
                  ),
                  getElementByMCID: t.getElementByMCID.bind(v(t)),
                  setCustomEntity: t.setCustomEntity.bind(v(t)),
                  fragment: !0,
                }),
                (t.elementsByMCID = {}),
                t
              );
            }
            return n;
          })($r),
          Jr = (function (t) {
            d(n, t);
            var e = g(n);
            function n() {
              var t,
                i,
                r,
                s =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : {},
                a =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : null;
              o(this, n),
                null === a ? ((i = {}), (r = s)) : ((i = s), (r = a)),
                (t = e.call(this, i, r));
              var u = new Kr(
                p(
                  p({}, r),
                  {},
                  {
                    html: Object.prototype.hasOwnProperty.call(r, "html")
                      ? r.html
                      : t.html,
                    css: Object.prototype.hasOwnProperty.call(r, "css")
                      ? r.css
                      : t.css,
                    fonts: Object.prototype.hasOwnProperty.call(r, "fonts")
                      ? r.fonts
                      : t.fonts,
                  }
                )
              );
              return (
                (t.ownContext = p(p({}, u.context), {}, { isHostedClip: !1 })),
                (t.iframe = u.iframeElement),
                (t.forceExportIncidents = !0),
                t.onDOMCLipInitialise(),
                t
              );
            }
            return (
              l(n, [
                {
                  key: "exportConstructionArguments",
                  value: function () {
                    return {
                      attrs: this.attrs,
                      props: p(
                        p({}, this.props),
                        {},
                        { html: this.context.rootElement.innerHTML }
                      ),
                    };
                  },
                },
                { key: "onDOMCLipInitialise", value: function () {} },
                {
                  key: "rootElement",
                  get: function () {
                    return this.context.clipContainer;
                  },
                },
              ]),
              n
            );
          })(br),
          Wr = (function () {
            function t() {
              o(this, t);
            }
            return (
              l(t, [
                {
                  key: "duration",
                  get: function () {
                    return 0;
                  },
                },
                {
                  key: "addIncident",
                  value: function () {
                    return { result: !0, execute: function () {} };
                  },
                },
                {
                  key: "moveIncident",
                  value: function () {
                    return { result: !0, execute: function () {} };
                  },
                },
                {
                  key: "removeIncident",
                  value: function () {
                    return { result: !0, execute: function () {} };
                  },
                },
                {
                  key: "resizeIncident",
                  value: function () {
                    return { result: !0, execute: function () {} };
                  },
                },
                {
                  key: "getIncidentsByChannel",
                  value: function () {
                    return {};
                  },
                },
                { key: "flash", value: function () {} },
                { key: "_resize", value: function () {} },
                { key: "onProgress", value: function () {} },
              ]),
              t
            );
          })(),
          Hr = (function () {
            function t(e) {
              o(this, t),
                (this.runTimeInfo = {
                  currentMillisecond: 0,
                  state: "transitional",
                }),
                (this.id = rt()),
                (this.realClip = e.descriptiveIncident.realClip);
              var n = e.descriptiveIncident.realClip.exportConstructionArguments(),
                i = p(
                  p({}, n.props),
                  {},
                  { selector: void 0, host: e.host, id: this.id }
                );
              (this.ownClip = new e.descriptiveIncident.constructor.Incident(
                n.attrs,
                i
              )),
                e.descriptiveIncident.realClip.addContext(
                  {
                    clipId: this.id,
                    context: this.ownClip.context,
                    synchronize: e.synchronize,
                    runTimeInfo: this.runTimeInfo,
                  },
                  !0
                );
            }
            return (
              l(t, [
                {
                  key: "onProgress",
                  value: function (t, e) {
                    for (var n in this.realClip.instantiatedChannels) {
                      this.realClip.instantiatedChannels[n].moveTo(
                        this.runTimeInfo.currentMillisecond,
                        e,
                        this.id,
                        !0
                      );
                    }
                    this.runTimeInfo.currentMillisecond = e;
                  },
                },
              ]),
              t
            );
          })(),
          Ur = T(
            null,
            function (t, e) {
              var n = (function (e) {
                d(i, e);
                var n = g(i);
                function i(e) {
                  var r,
                    s,
                    a,
                    u =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : null;
                  o(this, i),
                    null === u ? ((s = {}), (a = e)) : ((s = e), (a = u)),
                    (r = n.call(this, s, a)),
                    t(v(r)),
                    (r.initParams = a.initParams || {});
                  var l = r._validateProps();
                  if (!l.result) return y(r, l);
                  (r.isTheRootClip = !1),
                    (r.isExportableToJSONFormat = !0),
                    Object.prototype.hasOwnProperty.call(a, "html") &&
                      U(a.html) &&
                      (r.isExportableToJSONFormat = !1);
                  var c = {
                    id: r.id,
                    attrs: s,
                    props: p(
                      p({}, a),
                      {},
                      {
                        html: Object.prototype.hasOwnProperty.call(a, "html")
                          ? a.html
                          : r.html,
                        css: Object.prototype.hasOwnProperty.call(a, "css")
                          ? a.css
                          : r.css,
                        fonts: Object.prototype.hasOwnProperty.call(a, "fonts")
                          ? a.fonts
                          : r.fonts,
                        runTimeInfo: r.runTimeInfo,
                        subscribe: r.subscribe.bind(v(r)),
                        repeats: 1,
                        delay: 0,
                        hiatus: 0,
                      }
                    ),
                    plugin_npm_name: r.constructor.plugin_npm_name,
                    Channel: r.constructor.Channel,
                    DescriptiveIncident: v(r),
                  };
                  if (
                    ((r.audio = "on"),
                    Object.prototype.hasOwnProperty.call(
                      r.constructor,
                      "audio"
                    ) && (r.audio = r.constructor.audio),
                    Object.prototype.hasOwnProperty.call(a, "audio") &&
                      (r.audio = a.audio),
                    Object.prototype.hasOwnProperty.call(a, "selector") &&
                      void 0 !== a.selector &&
                      !0 !== r.constructor.customClip)
                  )
                    c.Incident = Jr;
                  else if (
                    Object.prototype.hasOwnProperty.call(a, "selector") &&
                    void 0 !== a.selector &&
                    !0 === r.constructor.customClip
                  ) {
                    delete c.props.selector;
                    var h = new Jr({ html: '<div id="clip-container"></div>' });
                    (c.props.host = h.rootElement),
                      (c.Incident = r.constructor.Incident);
                  } else
                    "only" === r.audio && !0 !== r.props.root
                      ? (r.isTheRootClip = !1)
                      : ((r.isTheRootClip = !0),
                        (r.blockingWaitings = {}),
                        (c.Incident = r.constructor.Incident));
                  if (
                    ("on" === r.audio || "off" === r.audio
                      ? (r.realClip = jt(c))
                      : (r.realClip = new Wr()),
                    "on" === r.audio || "only" === r.audio)
                  ) {
                    var d = {
                      id: r.id,
                      attrs: {},
                      props: {
                        audioSources: Object.prototype.hasOwnProperty.call(
                          a,
                          "audioSources"
                        )
                          ? a.audioSources
                          : r.audioSources,
                        runTimeInfo: r.runTimeInfo,
                        subscribe: r.subscribe.bind(v(r)),
                      },
                      plugin_npm_name: r.constructor.plugin_npm_name,
                      Channel: r.constructor.Channel,
                      Incident: Ir,
                      DescriptiveIncident: v(r),
                    };
                    r.audioClip = jt(d);
                  } else (r.audio = "off"), (r.audioClip = new Wr());
                  return (
                    (r.attributesStaggers = []),
                    (r.propsStaggers = []),
                    r.setupDynamicValues(),
                    (r.dynamicDurationValue = null),
                    (r.passiveAddition = !0),
                    r._buildTree(),
                    (r.passiveAddition = !1),
                    r.constructor.isAnimation &&
                      Object.prototype.hasOwnProperty.call(
                        r.props,
                        "duration"
                      ) &&
                      r.resize(r.duration),
                    r
                  );
                }
                return i;
              })(e);
              return {
                F: n,
                d: [
                  {
                    kind: "field",
                    static: !0,
                    key: "isClip",
                    value: function () {
                      return !0;
                    },
                  },
                  {
                    kind: "field",
                    static: !0,
                    key: "Incident",
                    value: function () {
                      return qr;
                    },
                  },
                  {
                    kind: "field",
                    static: !0,
                    key: "plugin_npm_name",
                    value: function () {
                      return "@kissmybutton/self-contained-incidents";
                    },
                  },
                  {
                    kind: "field",
                    static: !0,
                    key: "version",
                    value: function () {
                      return Gt;
                    },
                  },
                  {
                    kind: "field",
                    static: !0,
                    key: "Channel",
                    value: function () {
                      return xt;
                    },
                  },
                  {
                    kind: "field",
                    static: !0,
                    key: "ClassName",
                    value: function () {
                      return "HTMLClip";
                    },
                  },
                  {
                    kind: "field",
                    static: !0,
                    key: "propsValidationRules",
                    value: function () {
                      return Qi;
                    },
                  },
                  {
                    kind: "method",
                    key: "_validateProps",
                    value: function () {
                      return ot.validateProps(
                        { props: this.props },
                        Qi,
                        this.constructor,
                        this.id
                      );
                    },
                  },
                  {
                    kind: "get",
                    key: "selectorToPassToChildren",
                    value: function () {
                      return null;
                    },
                  },
                  {
                    kind: "get",
                    key: "inheritedSelector",
                    value: function () {
                      return this._inheritedSelector;
                    },
                  },
                  {
                    kind: "set",
                    key: "inheritedSelector",
                    value: function (t) {
                      this._inheritedSelector = t;
                    },
                  },
                  {
                    kind: "get",
                    key: "html",
                    value: function () {
                      return "";
                    },
                  },
                  {
                    kind: "get",
                    key: "css",
                    value: function () {
                      return "";
                    },
                  },
                  {
                    kind: "get",
                    key: "fonts",
                    value: function () {
                      return [];
                    },
                  },
                  {
                    kind: "get",
                    key: "audioSources",
                    value: function () {
                      return [];
                    },
                  },
                  {
                    kind: "method",
                    decorators: [pr],
                    key: "setupDynamicValues",
                    value: function () {},
                  },
                  {
                    kind: "get",
                    key: "duration",
                    value: function () {
                      return null !== this.dynamicDurationValue
                        ? this.dynamicDurationValue
                        : this.propsStaggers.length > 0
                        ? "dynamic"
                        : Object.prototype.hasOwnProperty.call(
                            this.props,
                            "duration"
                          )
                        ? this.repeats *
                          (this.delay + this.props.duration + this.hiatus)
                        : k(f(n.prototype), "duration", this);
                    },
                  },
                  {
                    kind: "set",
                    key: "duration",
                    value: function (t) {
                      if (0 != this.propsStaggers.length) {
                        for (var e = 0; e < this.propsStaggers.length; e++)
                          if ("repeats" !== this.propsStaggers[e].path) {
                            var i = this.propsStaggers[e].stagger.resize(
                              t / this.duration
                            );
                            at(this.props, this.propsStaggers[e].path, i);
                          }
                        this.dynamicDurationValue = t;
                      } else w(f(n.prototype), "duration", t, this, !0);
                    },
                  },
                  {
                    kind: "method",
                    key: "systoleDiastole",
                    value: function (t) {
                      this.constructor.isAnimation &&
                        (this.props.duration
                          ? (this.props.duration *= t)
                          : (this.props.duration =
                              t * this.calculatedDuration)),
                        this.realClip._resize(t),
                        k(f(n.prototype), "systoleDiastole", this).call(
                          this,
                          t
                        );
                    },
                  },
                  {
                    kind: "method",
                    key: "exportLiveDefinition",
                    value: function () {
                      var t =
                          !(arguments.length > 0 && void 0 !== arguments[0]) ||
                          arguments[0],
                        e = k(
                          f(n.prototype),
                          "exportLiveDefinition",
                          this
                        ).call(this, t);
                      return (
                        this.constructor.isAnimation &&
                          (e.props.duration = this.props.duration
                            ? this.props.duration
                            : this.calculatedDuration),
                        U(this.props.html) && (e.props.html = this.props.html),
                        U(this.props.css) && (e.props.css = this.props.css),
                        e
                      );
                    },
                  },
                  {
                    kind: "method",
                    key: "_buildTree",
                    value: function () {
                      void 0 !== this.realClip && this.buildTree();
                    },
                  },
                  {
                    kind: "method",
                    key: "resize",
                    value: function (t) {
                      if ("dynamic" === this.duration)
                        return {
                          result: !1,
                          reason:
                            "Incidents with dynamic duration can't be resized. Once the Incident enters a Clip it'll become resizable",
                        };
                      var e = t / this.duration;
                      return (
                        this.realClip._resize(e),
                        this.audioClip._resize(e),
                        (this.duration = t),
                        this.constructor.isAnimation &&
                          (this.props.duration
                            ? (this.props.duration *= e)
                            : (this.props.duration = this.calculatedDuration)),
                        this.putMessageOnPipe("recalcDuration", {}, "Groups", {
                          selfExecute: !1,
                          direction: ct,
                        }),
                        this.putMessageOnPipe("flash", {}, "RootClip", {
                          selfExecute: !0,
                          direction: ct,
                        }),
                        { result: !0 }
                      );
                    },
                  },
                  {
                    kind: "method",
                    key: "manageEditAttrProps",
                    value: function (t, e) {
                      return {
                        result: !1,
                        errors: [
                          "Clips attributes and properties can not be edited",
                        ],
                      };
                    },
                  },
                  {
                    kind: "method",
                    key: "handleCheckForClip",
                    value: function (t, e) {
                      return !0;
                    },
                  },
                  {
                    kind: "method",
                    key: "handleGetElements",
                    value: function (t, e) {
                      return this.realClip.getElements(e.selector);
                    },
                  },
                  {
                    kind: "method",
                    key: "handleCheckAddition",
                    value: function (t, e) {
                      var n = this.realClip.addIncident(e),
                        i = this.audioClip.addIncident(e);
                      return !0 === n.result && !0 === i.result
                        ? (n.execute(),
                          i.execute(),
                          this.putMessageOnPipe("flash", {}, "RootClip", {
                            selfExecute: !0,
                            direction: ct,
                          }),
                          { result: !0 })
                        : n;
                    },
                  },
                  {
                    kind: "method",
                    key: "handleCheckMove",
                    value: function (t, e) {
                      var n = this.realClip.moveIncident(e),
                        i = this.audioClip.moveIncident(e);
                      return !0 === n.result && !0 === i.result
                        ? (n.execute(),
                          i.execute(),
                          this.putMessageOnPipe("flash", {}, "RootClip", {
                            selfExecute: !0,
                            direction: ct,
                          }),
                          { result: !0 })
                        : n;
                    },
                  },
                  {
                    kind: "method",
                    key: "handleCheckDeletion",
                    value: function (t, e) {
                      var n = this.realClip.removeIncident(e),
                        i = this.audioClip.removeIncident(e);
                      return !0 === n.result && !0 === i.result
                        ? (n.execute(),
                          i.execute(),
                          this.putMessageOnPipe("flash", {}, "RootClip", {
                            selfExecute: !0,
                            direction: ct,
                          }),
                          { result: !0 })
                        : n;
                    },
                  },
                  {
                    kind: "method",
                    key: "handleCheckResize",
                    value: function (t, e) {
                      var n = this.realClip.resizeIncident(e),
                        i = this.audioClip.resizeIncident(e);
                      return !0 === n.result && !0 === i.result
                        ? (n.execute(),
                          i.execute(),
                          this.putMessageOnPipe("flash", {}, "RootClip", {
                            selfExecute: !0,
                            direction: ct,
                          }),
                          { result: !0 })
                        : n;
                    },
                  },
                  {
                    kind: "method",
                    key: "handleFlash",
                    value: function (t, e) {
                      if (!this.isTheRootClip) return this.bypass();
                      this.flash();
                    },
                  },
                  {
                    kind: "method",
                    key: "exportDefinition",
                    value: function () {
                      var t = k(f(n.prototype), "exportDefinition", this).call(
                        this
                      );
                      return (
                        this.constructor.isAnimation &&
                          (t.props.duration = this.props.duration
                            ? this.props.duration
                            : this.calculatedDuration),
                        t
                      );
                    },
                  },
                  {
                    kind: "method",
                    key: "handleSetBlock",
                    value: function (t, e) {
                      if (!this.isTheRootClip) return this.bypass();
                      "transitional" !== this.runTimeInfo.state &&
                        ("blocked" !== this.runTimeInfo.state &&
                          (this.statusBeforeBlock = this.runTimeInfo.state),
                        (this.blockingWaitings[e.id] = e),
                        this.block());
                    },
                  },
                  {
                    kind: "method",
                    key: "handleUnBlock",
                    value: function (t, e) {
                      if (!this.isTheRootClip) return this.bypass();
                      Object.prototype.hasOwnProperty.call(
                        this.blockingWaitings,
                        e.id
                      ) &&
                        (delete this.blockingWaitings[e.id],
                        0 === Object.keys(this.blockingWaitings).length &&
                          ("playing" === this.statusBeforeBlock
                            ? ((this.previousTimeStamp = -1), this.play())
                            : this.arm()));
                    },
                  },
                  {
                    kind: "method",
                    key: "stop",
                    value: function () {
                      k(f(n.prototype), "stop", this).call(this),
                        (this.blockingWaitings = {});
                    },
                  },
                  {
                    kind: "method",
                    key: "onProgress",
                    value: function (t, e) {
                      this.realClip.onProgress(t, e),
                        this.audioClip.onProgress(t, e);
                    },
                  },
                  {
                    kind: "method",
                    key: "paste",
                    value: function (t) {
                      return this.isTheRootClip
                        ? new Hr({ host: t, descriptiveIncident: this })
                        : null;
                    },
                  },
                  {
                    kind: "method",
                    key: "flash",
                    value: function () {
                      this.realClip.flash();
                    },
                  },
                  {
                    kind: "method",
                    key: "setVolume",
                    value: function (t) {
                      return t < 0 || t > 1
                        ? {
                            result: !1,
                            errors: [{ type: "invalid volume number" }],
                          }
                        : "off" === this.audio
                        ? {
                            result: !1,
                            errors: [
                              {
                                type:
                                  "can not set volume of Clip with audio off",
                              },
                            ],
                          }
                        : (this.audioClip.setVolume(t), { result: !0 });
                    },
                  },
                ],
              };
            },
            (function (t) {
              d(n, t);
              var e = g(n);
              function n(t, i) {
                var r;
                return (
                  o(this, n),
                  ((r = e.call(this, t, i)).runTimeInfo = {
                    currentMillisecond: 0,
                    state: "idle",
                  }),
                  (r.listeners = {}),
                  (r.previousTimeStamp = -1),
                  (r.speed = 1),
                  r
                );
              }
              return (
                l(n, [
                  {
                    key: "_setState",
                    value: function (t) {
                      if (t !== this.runTimeInfo.state)
                        for (var e in ((this.runTimeInfo.state = t),
                        this.putMessageOnPipe("setState", t, "Clips", {
                          selfExecute: !1,
                          direction: ht,
                        }),
                        this.listeners)) {
                          this.listeners[e].funct(
                            this.runTimeInfo.currentMillisecond,
                            t
                          );
                        }
                    },
                  },
                  {
                    key: "handleSetState",
                    value: function (t, e) {
                      this._setState(e);
                    },
                  },
                  {
                    key: "play",
                    value: function () {
                      var t = this,
                        e =
                          arguments.length > 0 &&
                          void 0 !== arguments[0] &&
                          arguments[0];
                      if (
                        "idle" === this.runTimeInfo.state ||
                        "paused" === this.runTimeInfo.state ||
                        "armed" === this.runTimeInfo.state ||
                        "transitional" === this.runTimeInfo.state ||
                        "blocked" === this.runTimeInfo.state
                      ) {
                        if ("paused" === this.runTimeInfo.state) {
                          var n = new Date().getTime() - this.pauseMoment;
                          this.previousTimeStamp += n;
                        }
                        this._setState("playing"),
                          this.onPlay(),
                          e ||
                            window.requestAnimationFrame(function (e) {
                              t.step(e);
                            });
                      }
                    },
                  },
                  {
                    key: "pause",
                    value: function () {
                      "playing" === this.runTimeInfo.state &&
                        (this._setState("paused"),
                        (this.pauseMoment = new Date().getTime()),
                        this.onWait());
                    },
                  },
                  {
                    key: "arm",
                    value: function () {
                      ("transitional" !== this.runTimeInfo.state &&
                        "blocked" !== this.runTimeInfo.state) ||
                        this._setState("armed");
                    },
                  },
                  {
                    key: "complete",
                    value: function () {
                      this._setState("idle"), (this.previousTimeStamp = -1);
                    },
                  },
                  {
                    key: "stop",
                    value: function () {
                      this._setState("transitional"),
                        (this.previousTimeStamp = -1);
                    },
                  },
                  {
                    key: "block",
                    value: function () {
                      this._setState("blocked"), (this.previousTimeStamp = -1);
                    },
                  },
                  { key: "onPlay", value: function () {} },
                  { key: "onWait", value: function () {} },
                  {
                    key: "playableProgress",
                    value: function (t, e) {
                      if (this.isTheRootClip) {
                        for (var n in this.listeners) {
                          var i = this.listeners[n];
                          !0 !== i.onlyOnStateChange &&
                            (Math.abs(
                              e +
                                i.cavaDelta -
                                this.runTimeInfo.currentMillisecond
                            ) > i.threshold
                              ? (i.funct(
                                  et(e, i.roundTo),
                                  this.runTimeInfo.state
                                ),
                                (i.cavaDelta = 0))
                              : (i.cavaDelta += Math.abs(
                                  e - this.runTimeInfo.currentMillisecond
                                )));
                        }
                        return (
                          this.onProgress(t, e),
                          (this.runTimeInfo.currentMillisecond = e),
                          !0
                        );
                      }
                      return !1;
                    },
                  },
                  {
                    key: "executionSpeed",
                    set: function (t) {
                      if (!this.isTheRootClip) return !1;
                      this.speed = parseFloat(t);
                    },
                  },
                  {
                    key: "step",
                    value: function (t) {
                      var e =
                        arguments.length > 1 &&
                        void 0 !== arguments[1] &&
                        arguments[1];
                      if ("playing" === this.runTimeInfo.state) {
                        var n = this;
                        -1 === this.previousTimeStamp &&
                          (this.previousTimeStamp = t);
                        var i = {
                          milliseconds: Math.round(
                            this.runTimeInfo.currentMillisecond +
                              (t - this.previousTimeStamp) * this.speed
                          ),
                          fraction:
                            (this.runTimeInfo.currentMillisecond +
                              (t - this.previousTimeStamp) * this.speed) /
                            this.duration,
                        };
                        if (i.fraction >= 1)
                          return (
                            this.playableProgress(1, this.duration),
                            void this.complete()
                          );
                        if (i.fraction < 0)
                          return (
                            this.playableProgress(0, 0), void this.complete()
                          );
                        this.playableProgress(i.fraction, i.milliseconds),
                          (this.previousTimeStamp = t),
                          e || window.requestAnimationFrame(n.step.bind(n));
                      }
                    },
                  },
                  {
                    key: "subscribe",
                    value: function (t, e, n, i) {
                      var r =
                        arguments.length > 4 &&
                        void 0 !== arguments[4] &&
                        arguments[4];
                      n || (n = 0),
                        i || (i = 1),
                        (this.listeners[t] = {
                          funct: e,
                          threshold: n,
                          roundTo: i,
                          cavaDelta: 0,
                          onlyOnStateChange: r,
                        });
                    },
                  },
                  {
                    key: "unsubscribe",
                    value: function (t) {
                      Object.prototype.hasOwnProperty.call(this.listeners, t) &&
                        delete this.listeners[t];
                    },
                  },
                  {
                    key: "subscribeToDurationChange",
                    value: function (t) {
                      return (
                        !!this.isTheRootClip &&
                        (this.realClip.subscribeToDurationChange(t), !0)
                      );
                    },
                  },
                ]),
                n
              );
            })(dr)
          ),
          Qr = Si.compile({
            incidents: {
              type: "array",
              items: {
                type: "object",
                props: {
                  position: {
                    type: "amount",
                    integer: !0,
                    min: 0,
                    optional: !1,
                  },
                  attrs: { type: "object", optional: !1 },
                  props: { type: "object", optional: !1 },
                  incidentClass: { type: "any", optional: !1 },
                },
              },
            },
          }),
          Xr = (function (t) {
            d(n, t);
            var e = g(n);
            function n(t, i) {
              var r;
              o(this, n),
                null !== (r = e.call(this, t, i)).incidents &&
                  ((r.attrs.incidents = r.incidents),
                  (r.attributesStaggers = []),
                  (r.propsStaggers = []),
                  r.setupDynamicValues());
              var s = ot.validateProps(r.props, Zi, r.constructor);
              if (!s.result) return y(r, s);
              var a = Qr(r.attrs);
              if (a.length > 0)
                return (
                  ot.error(
                    "The provided attributes for Combo Incident are invalid"
                  ),
                  y(r, { result: !1, errors: a })
                );
              for (var u = [], l = 0; l < r.attrs.length; l++) {
                var c = r.attrs[l];
                if (null !== c.incidentClass.attrsValidationRules) {
                  var h = c.incidentClass.attrsValidationMethod(c.attrs);
                  h.length > 0 && u.concat(h.errors);
                }
                var p = ot.validateProps(
                  c.props,
                  c.incidentClass.propsValidationRules,
                  c.incidentClass
                );
                !1 === p.result && u.concat(p.errors);
              }
              return u.length > 0
                ? y(r, { result: !1, errors: u })
                : ((r.dynamicDurationValue = null), r);
            }
            return (
              l(n, [
                {
                  key: "incidents",
                  get: function () {
                    return null;
                  },
                },
                {
                  key: "duration",
                  get: function () {
                    return null !== this.dynamicDurationValue
                      ? this.dynamicDurationValue
                      : "dynamic";
                  },
                },
                {
                  key: "addIncident",
                  value: function () {
                    var t =
                      "Combos don't accept any Incidents to be added on their timeline externally";
                    return ot.error(t), { result: !1, errors: [t] };
                  },
                },
                {
                  key: "moveIncident",
                  value: function () {
                    var t =
                      "Combo Incidents don't allow external manipulation of their Incidents";
                    return ot.error(t), { result: !1, errors: [t] };
                  },
                },
                {
                  key: "removeIncident",
                  value: function () {
                    var t =
                      "Combo Incidents don't allow external manipulation of their Incidents";
                    return ot.error(t), { result: !1, errors: [t] };
                  },
                },
                {
                  key: "handleCheckAddition",
                  value: function (t, e) {
                    return !1;
                  },
                },
                {
                  key: "handleCheckMove",
                  value: function (t, e) {
                    return !1;
                  },
                },
                {
                  key: "handleCheckDeletion",
                  value: function (t, e) {
                    return !1;
                  },
                },
                {
                  key: "handleCheckResize",
                  value: function (t, e) {
                    return !1;
                  },
                },
                {
                  key: "exportDefinition",
                  value: function () {
                    var t = p(
                      p({}, this.attrs),
                      {},
                      {
                        incidents: (function t(e) {
                          for (var n = [], i = 0; i < e.length; i++) {
                            var r = e[i],
                              s = r.attrs;
                            "Combo" === r.incidentClass.ClassName &&
                              (s = p(
                                p({}, s),
                                {},
                                { incidents: t(s.incidents) }
                              )),
                              n.push({
                                ClassName:
                                  r.incidentClass.ClassName ||
                                  r.incidentClass.targetClass.ClassName,
                                plugin_npm_name:
                                  r.incidentClass.plugin_npm_name ||
                                  r.incidentClass.targetClass.plugin_npm_name,
                                version:
                                  r.incidentClass.version ||
                                  r.incidentClass.targetClass.version,
                                attrs: s,
                                props: JSON.parse(JSON.stringify(r.props)),
                                position: r.position,
                              });
                          }
                          return n;
                        })(this.attrs.incidents),
                      }
                    );
                    return {
                      ClassName: this.constructor.ClassName,
                      version: this.constructor.version,
                      plugin:
                        this.constructor.plugin ||
                        this.constructor.plugin_npm_name,
                      plugin_npm_name: this.constructor.plugin_npm_name,
                      attrs: t,
                      props: JSON.parse(JSON.stringify(this.props)),
                      incidents: {},
                      duration: this.duration,
                    };
                  },
                },
                {
                  key: "exportLiveDefinition",
                  value: function () {
                    var t =
                        !(arguments.length > 0 && void 0 !== arguments[0]) ||
                        arguments[0],
                      e = this.attrs;
                    null !== this.incidents &&
                      (e = p(p({}, this.attrs), {}, { incidents: void 0 }));
                    var n = JSON.parse(JSON.stringify(this.props));
                    !1 === t && delete n.id;
                    var i = {
                      Class: this.constructor,
                      attrs: e,
                      props: n,
                      incidents: {},
                    };
                    return i;
                  },
                },
              ]),
              n
            );
          })(dr);
        c(Xr, "isCombo", !0),
          c(Xr, "ClassName", "Combo"),
          c(Xr, "attrsValidationRules", null),
          c(Xr, "propsValidationRules", Zi);
        var Zr = T(
            null,
            function (t, e) {
              var n = (function (e) {
                d(i, e);
                var n = g(i);
                function i(e, r) {
                  var s;
                  o(this, i),
                    void 0 === r && ((r = e), (e = {})),
                    (s = n.call(this, r)),
                    t(v(s));
                  var a = ot.validateProps(r, Wi, s.constructor, s.id);
                  return a.result
                    ? ((s.inheritedSelector = null),
                      (s.attrs = e),
                      Object.prototype.hasOwnProperty.call(r, "duration") ||
                        (r.duration = 0),
                      (s.props = r),
                      (s.attributesStaggers = []),
                      (s.propsStaggers = []),
                      s.setupDynamicValues(),
                      (s.dynamicDurationValue = null),
                      (s.passive = !1),
                      s)
                    : y(s, a);
                }
                return i;
              })(e);
              return {
                F: n,
                d: [
                  {
                    kind: "field",
                    static: !0,
                    key: "Incident",
                    value: function () {
                      return St;
                    },
                  },
                  {
                    kind: "field",
                    static: !0,
                    key: "plugin_npm_name",
                    value: function () {
                      return "motor-cortex-js-attribute";
                    },
                  },
                  {
                    kind: "field",
                    static: !0,
                    key: "version",
                    value: function () {
                      return Gt;
                    },
                  },
                  {
                    kind: "field",
                    static: !0,
                    key: "Channel",
                    value: function () {
                      return Nr;
                    },
                  },
                  {
                    kind: "field",
                    static: !0,
                    key: "ClassName",
                    value: function () {
                      return "Incident";
                    },
                  },
                  {
                    kind: "field",
                    static: !0,
                    key: "attrsValidationRules",
                    value: function () {
                      return null;
                    },
                  },
                  {
                    kind: "field",
                    static: !0,
                    key: "propsValidationRules",
                    value: function () {
                      return Wi;
                    },
                  },
                  {
                    kind: "method",
                    decorators: [nr],
                    key: "editAttributes",
                    value: function () {},
                  },
                  {
                    kind: "method",
                    decorators: [ir],
                    key: "editProperties",
                    value: function () {},
                  },
                  {
                    kind: "method",
                    decorators: [sr],
                    key: "resize",
                    value: function () {},
                  },
                  {
                    kind: "method",
                    decorators: [tr],
                    key: "clone",
                    value: function () {},
                  },
                  {
                    kind: "method",
                    decorators: [ar],
                    key: "selector",
                    value: function () {},
                  },
                  {
                    kind: "method",
                    decorators: [rr],
                    key: "getElements",
                    value: function () {},
                  },
                  {
                    kind: "method",
                    decorators: [pr],
                    key: "setupDynamicValues",
                    value: function () {},
                  },
                  {
                    kind: "get",
                    key: "duration",
                    value: function () {
                      return null !== this.dynamicDurationValue
                        ? this.dynamicDurationValue
                        : this.propsStaggers.length > 0
                        ? "dynamic"
                        : k(f(n.prototype), "duration", this);
                    },
                  },
                  {
                    kind: "set",
                    key: "duration",
                    value: function (t) {
                      if (this.propsStaggers.length > 0) {
                        for (var e = 0; e < this.propsStaggers.length; e++)
                          if ("repeats" !== this.propsStaggers[e].path) {
                            var i = this.propsStaggers[e].stagger.resize(
                              t / this.duration
                            );
                            at(this.props, this.propsStaggers[e].path, i);
                          }
                        this.dynamicDurationValue = t;
                      } else w(f(n.prototype), "duration", t, this, !0);
                    },
                  },
                  {
                    kind: "method",
                    key: "manageEditAttrProps",
                    value: function (t, e) {
                      var n = this.parentNode,
                        i = n.getLeafPosition(this.id);
                      n.removeIncident(this.id);
                      var r = JSON.parse(JSON.stringify(this[e]));
                      this[e] = t;
                      var s = n.addIncident(this, i);
                      return (
                        s.result ||
                          (n.removeIncident(this.id),
                          (this[e] = r),
                          n.addIncident(this, i)),
                        s
                      );
                    },
                  },
                  {
                    kind: "method",
                    key: "detachFromParent",
                    value: function () {
                      k(f(n.prototype), "detachFromParent", this).call(this),
                        (this.inheritedSelector = null);
                    },
                  },
                  {
                    kind: "method",
                    key: "handleCheckForInvalidSelectors",
                    value: function () {
                      var t = this.selector();
                      return null === t
                        ? {
                            id: this.id,
                            ClassName: this.constructor.ClassName,
                            plugin_npm_name: this.constructor.plugin_npm_name,
                            error: "null selector",
                          }
                        : "&" === t.charAt(0)
                        ? {
                            id: this.id,
                            ClassName: this.constructor.ClassName,
                            plugin_npm_name: this.constructor.plugin_npm_name,
                            error:
                              "relative selector with no inherited selector",
                            selector: t,
                          }
                        : this.bypass();
                    },
                  },
                  {
                    kind: "method",
                    key: "exportDefinition",
                    value: function () {
                      return {
                        ClassName: this.constructor.ClassName,
                        version: this.constructor.version,
                        plugin:
                          this.constructor.plugin ||
                          this.constructor.plugin_npm_name,
                        plugin_npm_name: this.constructor.plugin_npm_name,
                        attrs: this.attrs,
                        props: this.props,
                      };
                    },
                  },
                  {
                    kind: "method",
                    key: "exportLiveDefinition",
                    value: function () {
                      var t =
                          !(arguments.length > 0 && void 0 !== arguments[0]) ||
                          arguments[0],
                        e = JSON.parse(JSON.stringify(this.props));
                      return (
                        !1 === t && delete e.id,
                        {
                          Class: this.constructor,
                          attrs: JSON.parse(JSON.stringify(this.attrs)),
                          props: e,
                        }
                      );
                    },
                  },
                ],
              };
            },
            dt
          ),
          Yr = (function () {
            var t = function (t, e) {
                return t.startsWith("on") && "function" == typeof e;
              },
              e = function (t) {
                return t.substr(2).toLowerCase();
              },
              n = function (t) {
                return "function" == typeof t;
              };
            function i(t) {
              var e = document.createElement("div");
              return (e.innerHTML = t.trim()), e.firstChild;
            }
            function r(n, i) {
              if (!i) return n;
              for (var r = 0, s = Object.entries(i); r < s.length; r++) {
                var a = C(s[r], 2),
                  o = a[0],
                  u = a[1];
                if (t(o)) n.addEventListener(e(o), u);
                else if ("class" === o) {
                  var l,
                    c = Array.isArray(u) ? u : u.split(" ");
                  (l = n.classList).add.apply(l, O(c));
                } else n.setAttribute(o, u);
              }
              return n;
            }
            return function (t, e) {
              for (
                var s = arguments.length,
                  o = new Array(s > 2 ? s - 2 : 0),
                  u = 2;
                u < s;
                u++
              )
                o[u - 2] = arguments[u];
              if (n(t)) return t(p(p({}, e), {}, { children: o }));
              var l = r(document.createElement(t), e);
              return (
                o.flat().forEach(function (t) {
                  if (!1 !== t) {
                    var e = "object" === a(t) ? t : i(t.toString());
                    null !== e && l.appendChild(e);
                  }
                }),
                l.outerHTML
              );
            };
          })(),
          ts = (function () {
            function t(e) {
              if (
                (o(this, t),
                !Object.prototype.hasOwnProperty.call(e, "incident"))
              )
                return (
                  ot.error(
                    'Journey constructor expects an Incident on its properties on the key "incident"'
                  ),
                  !1
                );
              (this.memory = e.capsuleMemory),
                (this.stations = []),
                (this.incident = e.incident),
                (this.startMillisecond =
                  1 * this.incident.runTimeInfo.currentMillisecond),
                (this.startState = "".concat(this.incident.runTimeInfo.state)),
                this.incident.stop();
            }
            return (
              l(t, [
                {
                  key: "station",
                  value: function (t) {
                    this.stations.length > 0 &&
                      this.stations[this.stations.length - 1],
                      this.stations.push(t),
                      this.incident.playableProgress(
                        t / this.incident.duration,
                        t
                      );
                  },
                },
                {
                  key: "destination",
                  value: function () {
                    var t =
                      arguments.length > 0 && void 0 !== arguments[0]
                        ? arguments[0]
                        : null;
                    null != t
                      ? this.station(t)
                      : (t = this.stations[this.stations.length - 1]),
                      this.incident.playableProgress(
                        t / this.incident.duration,
                        t
                      ),
                      "playing" === this.startState ||
                      ("blocked" === this.startState &&
                        "playing" === this.incident.statusBeforeBlock)
                        ? this.incident.play()
                        : t >= this.incident.duration
                        ? this.incident.complete()
                        : this.incident.arm(),
                      this.memory.push(this.exportJourneyLog);
                  },
                },
                {
                  key: "exportJourneyLog",
                  value: function () {
                    return {
                      startMillisecond: this.startMillisecond,
                      startState: this.startState,
                      stations: this.stations,
                    };
                  },
                },
              ]),
              t
            );
          })(),
          es = (function () {
            function t() {
              o(this, t), (this.memory = []);
            }
            return (
              l(t, [
                {
                  key: "startJourney",
                  value: function (t) {
                    return t
                      ? new ts({ incident: t, capsuleMemory: this.memory })
                      : (ot.error(
                          "startJourney expects an Incident as an argument"
                        ),
                        !1);
                  },
                },
              ]),
              t
            );
          })(),
          ns = (function (t) {
            d(n, t);
            var e = g(n);
            function n(t) {
              var i =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : null;
              o(this, n);
              var r = { audio: "only", audioSources: t };
              return null !== i && (r.id = i), e.call(this, r);
            }
            return n;
          })(Ur);
        function is(t) {
          if (
            (Object.prototype.hasOwnProperty.call(t, "default") &&
              (t = t.default),
            Object.prototype.hasOwnProperty.call(t, "npm_name") ||
              (t.npm_name = "plugin_".concat(new Date().getTime())),
            !(function (t) {
              Object.prototype.hasOwnProperty.call(t, "default") &&
                (t = t.default);
              var e = t.npm_name,
                n = !0;
              if (
                (Object.prototype.hasOwnProperty.call(t, "name") ||
                  ot.notice(
                    "Notice on plugin ".concat(
                      e,
                      '. A plugin is always good to have its name on\n        its main.js file, under the key "name". It\'s missing from this plugin'
                    )
                  ),
                Object.prototype.hasOwnProperty.call(t, "version") ||
                  ot.notice(
                    "Notice on ".concat(
                      e,
                      ". Plugin should always expose its version number on main.js file.\n      Plugin version is missing"
                    )
                  ),
                Object.prototype.hasOwnProperty.call(t, "incidents") ||
                  Object.prototype.hasOwnProperty.call(t, "Clip") ||
                  (ot.error(
                    "Error on plugin ".concat(
                      e,
                      '. A plugin must expose at least one Incident or a Clip.\n        Exposed plugin Incidents should be defined on the "incidents" key of the main.js file while Clips on the "Clip".'
                    )
                  ),
                  (n = !1)),
                Object.prototype.hasOwnProperty.call(t, "incidents") &&
                  !Array.isArray(t.incidents))
              )
                ot.error(
                  "Error on plugin ".concat(
                    e,
                    '. thePlugin exposed Incidents are defined on the "incidents" key of the main.js file in array format.\n        Please refer to the documentation'
                  )
                ),
                  (n = !1);
              else if (Object.prototype.hasOwnProperty.call(t, "incidents"))
                for (var i = 0; i < t.incidents.length; i++) {
                  var r = t.incidents[i];
                  "object" === a(r.exportable) &&
                    Object.prototype.hasOwnProperty.call(
                      r.exportable,
                      "default"
                    ) &&
                    (r.exportable = r.exportable.default);
                  var s = r.exportable.prototype;
                  s instanceof dr ||
                    s instanceof Ur ||
                    s instanceof St ||
                    s instanceof _r ||
                    (ot.error(
                      "Error on plugin "
                        .concat(
                          e,
                          ". Exportable Incidents by any plugin must extend one of the base classes provided by MotorCortex.\n                "
                        )
                        .concat(
                          r.exportable.constructor.name,
                          " doesn't.\n                Please refer to documentation"
                        )
                    ),
                    (n = !1)),
                    s instanceof Ur &&
                      (Object.prototype.hasOwnProperty.call(r, "originalDims")
                        ? !1 === Z(r.originalDims).result &&
                          (ot.error(
                            "Error on plugin "
                              .concat(
                                e,
                                ". Invalid originalDims value passed on "
                              )
                              .concat(r.name)
                          ),
                          (n = !1))
                        : ot.log(
                            "Warning on plugin ".concat(
                              e,
                              '. It\'s always good to provide originalDims\n            when exposing Incidents extending DOMClip. By defining their original dims the users\n            of your plugin will be able to define the desired dimensions of your Incident by\n            the "containerParams object"'
                            )
                          )),
                    Object.prototype.hasOwnProperty.call(r, "name") ||
                      (ot.error(
                        "Error on plugin ".concat(
                          e,
                          '. Exportable Incidents by any plugin must have the "name" key which defines the name of the exported Incident.\n                Please refer to documentation'
                        )
                      ),
                      (n = !1));
                }
              return n;
            })(t))
          )
            return !1;
          var e = {};
          if (Object.prototype.hasOwnProperty.call(t, "Clip"))
            if (Object.prototype.hasOwnProperty.call(t.Clip, "exportable")) {
              var n,
                i,
                r,
                s =
                  ((i = n = (function (t) {
                    d(n, t);
                    var e = g(n);
                    function n() {
                      return o(this, n), e.apply(this, arguments);
                    }
                    return n;
                  })(Ur)),
                  c(n, "Incident", t.Clip.exportable),
                  c(n, "plugin", t.npm_name),
                  c(n, "version", t.version || "*"),
                  c(n, "audio", t.audio || "off"),
                  c(n, "customClip", !0),
                  i);
              Object.prototype.hasOwnProperty.call(
                t.Clip,
                "attributesValidationRules"
              ) && (r = Si.compile(t.Clip.attributesValidationRules));
              e.Clip = function e(n, i) {
                o(this, e);
                var a,
                  u = n,
                  l = i;
                if (
                  (void 0 === i && ((u = {}), (l = n)),
                  Object.prototype.hasOwnProperty.call(
                    t.Clip,
                    "attributesValidationRules"
                  ))
                ) {
                  var c = r(u);
                  if (c.length > 0) {
                    for (
                      var h = "Error on plugin's \"".concat(
                          t.npm_name,
                          '" Clip instantiation. Errors:'
                        ),
                        p = 0;
                      p < c.length;
                      p++
                    )
                      h += "\n - "
                        .concat(c[p].message, ". ")
                        .concat(c[p].actual, " provided");
                    return (
                      ot.error(h), ot.log("breaking"), { result: !1, errors: c }
                    );
                  }
                  ot.log("instantiating"),
                    ((a = new s(u, l)).attrsValidationRules =
                      t.Clip.attributesValidationRules),
                    (a.attrsValidationMethod = r);
                } else
                  ot.log("instantiating"),
                    ((a = new s(u, l)).attrsValidationRules = null),
                    ot.warning(
                      "It's always good to provide attributesValidationRules to the exported incidents. "
                        .concat(t.npm_name, ".")
                        .concat(a.constructor.name, " doesn't provide it")
                    );
                return a;
              };
            } else {
              var u,
                l,
                h =
                  ((l = u = (function (t) {
                    d(n, t);
                    var e = g(n);
                    function n() {
                      return o(this, n), e.apply(this, arguments);
                    }
                    return n;
                  })(Ur)),
                  c(u, "Incident", t.Clip),
                  c(u, "plugin", t.npm_name),
                  c(u, "version", t.version || "*"),
                  c(u, "audio", t.audio || "off"),
                  c(u, "customClip", !0),
                  l);
              ot.warning(
                "It's always good to provide attributesValidationRules to the exported incidents. ".concat(
                  t.npm_name,
                  ".Clip doesn't provide it"
                )
              ),
                (e.Clip = h);
            }
          var p = Nr;
          if (
            (Object.prototype.hasOwnProperty.call(t, "compositeAttributes") &&
              (p = (function (e) {
                d(i, e);
                var n = g(i);
                function i(e) {
                  return (
                    o(this, i),
                    (e.comboAttributes = t.compositeAttributes),
                    n.call(this, e)
                  );
                }
                return i;
              })(Nr)),
            Object.prototype.hasOwnProperty.call(t, "incidents"))
          )
            for (
              var f = function (n) {
                  var i = t.incidents[n].exportable,
                    r = null,
                    s = null,
                    a = !1;
                  if (
                    Object.prototype.hasOwnProperty.call(
                      t.incidents[n],
                      "attributesValidationRules"
                    )
                  ) {
                    a = !0;
                    var u = JSON.parse(
                      JSON.stringify(t.incidents[n].attributesValidationRules)
                    );
                    Object.prototype.hasOwnProperty.call(
                      t.incidents[n].attributesValidationRules,
                      "animatedAttrs"
                    ) &&
                      (u.initialValues = ot.buildInitialValuesValidationRules(
                        u.animatedAttrs
                      )),
                      (s = u),
                      (r = Si.compile(u));
                  }
                  var l,
                    h,
                    f = void 0;
                  if (i.prototype instanceof St)
                    (h = l = (function (t) {
                      d(n, t);
                      var e = g(n);
                      function n() {
                        return o(this, n), e.apply(this, arguments);
                      }
                      return n;
                    })(Zr)),
                      c(l, "Incident", i),
                      c(l, "plugin_npm_name", t.npm_name),
                      c(l, "plugin", t.npm_name),
                      c(l, "version", t.version || "*"),
                      c(l, "ClassName", t.incidents[n].name),
                      c(l, "Channel", p),
                      c(l, "audio", t.audio ? t.audio : "off"),
                      c(l, "attrsValidationRules", s),
                      c(l, "attrsValidationMethod", r),
                      (f = h);
                  else if (i.prototype instanceof _r) {
                    var m, v;
                    (v = m = (function (t) {
                      d(n, t);
                      var e = g(n);
                      function n() {
                        return o(this, n), e.apply(this, arguments);
                      }
                      return n;
                    })(Zr)),
                      c(m, "Incident", i),
                      c(m, "plugin_npm_name", "@kissmybutton/media-playback"),
                      c(m, "plugin", t.npm_name),
                      c(m, "version", t.version || "*"),
                      c(m, "ClassName", t.incidents[n].name),
                      c(m, "Channel", Ar),
                      c(m, "audio", t.audio ? t.audio : "off"),
                      c(m, "attrsValidationRules", s),
                      c(m, "attrsValidationMethod", r),
                      (f = v);
                  } else if (i.prototype instanceof Ur) {
                    var y, b;
                    (b = y = (function (t) {
                      d(n, t);
                      var e = g(n);
                      function n() {
                        return o(this, n), e.apply(this, arguments);
                      }
                      return n;
                    })(i)),
                      c(y, "plugin", t.npm_name),
                      c(y, "version", t.version || "*"),
                      c(y, "ClassName", t.incidents[n].name),
                      c(y, "audio", t.audio ? t.audio : "on"),
                      c(
                        y,
                        "originalDims",
                        Z(t.incidents[n].originalDims).analysis
                      ),
                      c(y, "attrsValidationRules", s),
                      c(y, "attrsValidationMethod", r),
                      c(y, "isAnimation", !0),
                      (f = b);
                  } else if (i.prototype instanceof dr) {
                    var k, x;
                    (x = k = (function (t) {
                      d(n, t);
                      var e = g(n);
                      function n() {
                        return o(this, n), e.apply(this, arguments);
                      }
                      return n;
                    })(i)),
                      c(k, "plugin", t.npm_name),
                      c(k, "version", t.version || "*"),
                      c(k, "ClassName", t.incidents[n].name),
                      c(k, "attrsValidationRules", s),
                      c(k, "attrsValidationMethod", r),
                      (f = x);
                  }
                  Object.defineProperty(e, t.incidents[n].name, {
                    enumerable: !0,
                    get: function () {
                      var e = function e(i, s) {
                        var u;
                        if ((o(this, e), a)) {
                          var l = r(i);
                          if (l.length > 0) {
                            for (
                              var c = "Error on plugin's \""
                                  .concat(t.npm_name, '" "')
                                  .concat(
                                    t.incidents[n].name,
                                    '" instantiation. Errors:'
                                  ),
                                h = 0;
                              h < l.length;
                              h++
                            )
                              c += "\n - "
                                .concat(l[h].message, ". ")
                                .concat(l[h].actual, " provided");
                            return ot.error(c), { result: !1, errors: l };
                          }
                        }
                        return (
                          (u = new f(i, s)).result &&
                            !a &&
                            ot.warning(
                              "It's always good to provide attributesValidationRules to the exported incidents. ".concat(
                                t.npm_name,
                                " doesn't provide it"
                              )
                            ),
                          u
                        );
                      };
                      return c(e, "targetClass", f), e;
                    },
                  });
                },
                m = 0;
              m < t.incidents.length;
              m++
            )
              f(m);
          return e;
        }
        window.fs = {};
        var rs = { createDOMElement: Yr, easings: Vt, clipFromDefinition: Yi },
          ss = is(Dr),
          as = ss.Clip,
          os = ss.AudioEffect,
          us = ss.AudioPlayback,
          ls = ns,
          cs = {
            version: Gt,
            Effect: St,
            utils: rs,
            HTMLClip: Ur,
            Group: dr,
            Combo: Xr,
            BrowserClip: qr,
            loadPlugin: is,
            AudioClip: ls,
            CoreAudioClip: as,
            AudioPlayback: us,
            AudioEffect: os,
            MediaPlayback: _r,
            TimeCapsule: es,
          };
        (t.AudioClip = ls),
          (t.AudioEffect = os),
          (t.AudioPlayback = us),
          (t.BrowserClip = qr),
          (t.Combo = Xr),
          (t.CoreAudioClip = as),
          (t.Effect = St),
          (t.Group = dr),
          (t.HTMLClip = Ur),
          (t.MediaPlayback = _r),
          (t.TimeCapsule = es),
          (t.default = cs),
          (t.loadPlugin = is),
          (t.utils = rs),
          Object.defineProperty(t, "__esModule", { value: !0 });
      });

      /***/
    },
    /* 1 */
    /***/ function (module, exports, __webpack_require__) {
      !(function (e, t) {
        true ? (module.exports = t(__webpack_require__(0))) : undefined;
      })(this, function (e) {
        "use strict";
        function t(e) {
          return e && "object" == typeof e && "default" in e
            ? e
            : { default: e };
        }
        var n = t(e);
        function o(e) {
          return (o =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    "function" == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? "symbol"
                    : typeof e;
                })(e);
        }
        function s(e, t) {
          for (var n = 0; n < t.length; n++) {
            var o = t[n];
            (o.enumerable = o.enumerable || !1),
              (o.configurable = !0),
              "value" in o && (o.writable = !0),
              Object.defineProperty(e, o.key, o);
          }
        }
        function i(e, t, n) {
          return (
            t in e
              ? Object.defineProperty(e, t, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[t] = n),
            e
          );
        }
        function a(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(e);
            t &&
              (o = o.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              n.push.apply(n, o);
          }
          return n;
        }
        function l(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? a(Object(n), !0).forEach(function (t) {
                  i(e, t, n[t]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
              : a(Object(n)).forEach(function (t) {
                  Object.defineProperty(
                    e,
                    t,
                    Object.getOwnPropertyDescriptor(n, t)
                  );
                });
          }
          return e;
        }
        var r = function (e) {
            return document.querySelectorAll(e);
          },
          c = function (e) {
            return document.getElementById(e);
          },
          p = function (e) {
            return document.getElementsByTagName(e);
          },
          d = function (e) {
            return document.createElement(e);
          },
          u = function () {
            var e;
            return (e = document).addEventListener.apply(e, arguments);
          },
          m = function () {
            var e;
            return (e = document).removeEventListener.apply(e, arguments);
          },
          h = function (e, t) {
            var n =
              arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            function o(e) {
              return "number" == typeof e && isFinite(e);
            }
            var s = new RegExp("^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)", "gi"),
              i = null,
              a = null;
            if (Object.prototype.hasOwnProperty.call(e, "width")) {
              var l = e.width.match(s)[0],
                r = e.width.substring(l.length);
              i =
                !o(Number(l)) || ("%" !== r && "px" !== r)
                  ? null
                  : { number: Number(l), unit: r };
            }
            if (Object.prototype.hasOwnProperty.call(e, "height")) {
              var c = e.height.match(s)[0],
                p = e.height.substring(c.length);
              a =
                !o(Number(c)) || ("%" !== p && "px" !== p)
                  ? null
                  : { number: Number(c), unit: p };
            }
            var d = 1,
              u = 1;
            null !== i &&
              "px" === i.unit &&
              i.number !== t.width &&
              (d = t.width / i.number),
              null !== a &&
                "px" === a.unit &&
                a.number !== t.height &&
                (u = t.height / a.number);
            var m = 1;
            m = n ? (u > d ? u : d) : u <= d ? u : d;
            var h = {};
            if (null !== i) {
              var g;
              g =
                "px" === i.unit ? i.number * m : (i.number / 100) * t.width * m;
              var v = t.width - g;
              h.left = v / 2;
            }
            if (null !== i) {
              var f;
              f =
                "px" === a.unit
                  ? a.number * m
                  : (a.number / 100) * t.height * m;
              var b = t.height - f;
              h.top = b / 2;
            }
            return { scale: m, position: h };
          },
          g = function () {
            var e = new Date().getTime();
            return "xxxxxxxx-xxxx".replace(/[xy]/g, function (t) {
              var n = (e + 16 * Math.random()) % 16 | 0;
              e = Math.floor(e / 16);
              var o = Math.random() > 0.5,
                s = ("x" == t ? n : (3 & n) | 8).toString(16);
              return o ? s.toUpperCase() : s;
            });
          };
        var v = (function (e, t) {
            return e((t = { exports: {} }), t.exports), t.exports;
          })(function (e) {
            var t = (e.exports = {});
            (t.playSVG =
              '\n  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20">\n    <path fill="#999" fill-rule="nonzero" d="M16.224 8.515L2.582.245A1.7 1.7 0 0 0 0 1.702V18.24a1.7 1.7 0 0 0 2.582 1.455l13.642-8.27a1.7 1.7 0 0 0 0-2.91z"/>\n</svg>\n\n'),
              (t.dcSVG =
                '\n  <svg class="svg" style="transform:scale(0.55)" version="1.0" xmlns="http://www.w3.org/2000/svg"\n width="1705.000000pt" height="1903.000000pt" viewBox="0 0 1705.000000 1903.000000"\n preserveAspectRatio="xMidYMid meet">\n<metadata>\nCreated by potrace 1.15, written by Peter Selinger 2001-2017\n</metadata>\n<g transform="translate(0.000000,1903.000000) scale(0.100000,-0.100000)"\nfill="#000000" stroke="none">\n<path d="M0 9515 l0 -9515 1583 0 1582 0 4430 4655 c2437 2561 4457 4687 4490\n4726 33 38 1164 1227 2513 2642 l2452 2572 0 2192 c0 1206 -2 2193 -4 2193 -3\n0 -1597 -1652 -3542 -3671 l-3538 -3671 -31 35 c-16 20 -1497 1683 -3290 3696\nl-3260 3661 -1692 0 -1693 0 0 -9515z m5504 2412 c1253 -1413 2279 -2574 2282\n-2580 3 -9 -3274 -3438 -4597 -4811 -5 -6 -9 1968 -9 4999 l0 5010 24 -25 c13\n-14 1048 -1181 2300 -2593z"/>\n<path d="M13924 7584 c-34 -17 -2029 -2158 -2029 -2178 0 -15 5121 -5400 5141\n-5404 12 -3 14 295 14 2241 l0 2245 -1478 1543 c-813 849 -1490 1550 -1505\n1557 -38 16 -105 15 -143 -4z"/>\n</g>\n</svg>\n'),
              (t.pauseSVG =
                '\n  <svg class="svg" style="transform:scale(1.5)" width="100%" height="100%" viewBox="0 0 36 36" >\n    <path id="pause-icon" data-state="playing" d="M11,10 L17,10 17,26 11,26 M20,10 L26,10 26,26 20,26" />\n  </svg>\n'),
              (t.replaySVG =
                '\n  <svg class="svg" width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">\n    <metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>\n    <g><g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)">\n      <path d="M5356.3,4203.8c-1247.8-153.1-2324.2-811.3-3000.7-1839.7c-379.4-578.2-596.5-1209-660.5-1933.4l-27.4-294.8H883.9c-431.9,0-783.9-6.9-783.9-18.3c0-9.2,477.6-493.7,1062.7-1078.7l1062.7-1062.7L3288.1-961.1C3873.1-376,4350.8,108.5,4350.8,117.6c0,11.4-356.5,18.3-790.7,18.3h-793l18.3,189.7C2831,876.3,2991,1338,3288.1,1779.1C4122.3,3026.9,5706,3472.5,7065.8,2841.8C7639.4,2578.9,8197,2035,8487.3,1461.4C8581,1274,8709,896.9,8754.7,666.1c48-246.8,54.8-811.3,9.1-1055.8C8567.3-1491.3,7788-2394,6720.7-2750.5c-315.4-107.4-541.6-139.4-941.6-139.4c-287.9,0-415.9,11.4-598.8,50.3c-523.3,112-973.6,335.9-1371.2,681c-75.4,68.6-148.5,123.4-160,123.4c-9.1,0-187.4-169.1-393.1-374.8c-434.2-434.2-420.5-363.4-105.1-628.5c852.4-710.7,1972.3-1055.8,3046.4-937c1627.2,176,2977.8,1257,3489.8,2790.4c457.1,1368.9,169.1,2843-777,3969.7C8322.7,3484,7417.8,4000.4,6503.6,4160.4C6197.4,4213,5619.2,4235.8,5356.3,4203.8z"/>\n      <path d="M4990.7,124.5c0-1503.8,4.6-1794,32-1778c16,9.1,505.1,413.6,1085.6,895.8C7113.8,78.8,7161.8,122.2,7122.9,161c-80,75.4-2109.4,1757.5-2120.8,1757.5C4995.3,1918.5,4990.7,1111.8,4990.7,124.5z"/>\n    </g></g>\n  </svg>\n'),
              (t.volumeSVG =
                '\n  <svg class="svg" width="100%" height="100%" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n   viewBox="0 0 286.374 286.374" enable-background="new 0 0 286.374 286.374" xml:space="preserve">\n    <g id="Volume_2">\n      <path style="fill-rule:evenodd;clip-rule:evenodd;" d="M233.636,26.767l-33.372,28.5c25.659,21.07,42.006,52.616,42.006,87.92\n        c0,35.305-16.347,66.851-42.006,87.921l33.372,28.499c32.324-28.869,52.738-70.268,52.738-116.421\n        C286.374,97.034,265.96,55.635,233.636,26.767z M177.737,74.513l-34.69,29.64c15.14,6.818,27.19,21.681,27.19,39.034\n        s-12.05,32.216-27.19,39.034l34.69,29.64c21.294-15.717,36.051-40.586,36.051-68.674C213.788,115.099,199.03,90.23,177.737,74.513z\n         M108.672,48.317L44.746,98.441H17.898C4.671,98.441,0,103.268,0,116.34v53.695c0,13.072,4.951,17.898,17.898,17.898h26.848\n        l63.926,50.068c7.668,4.948,16.558,6.505,16.558-7.365V55.683C125.23,41.813,116.34,43.37,108.672,48.317z"/>\n    </g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>\n  </svg>\n'),
              (t.volumeMuteSVG =
                '\n  <svg class="svg" width="100%" height="100%" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n   viewBox="0 0 286.277 286.277" enable-background="new 0 0 286.277 286.277" xml:space="preserve">\n    <g id="Volume_none">\n      <path style="fill-rule:evenodd;clip-rule:evenodd;" d="M245.102,143.151l36.98-37.071c5.593-5.605,5.593-14.681,0-20.284\n        l-10.124-10.142c-5.593-5.604-14.655-5.604-20.247,0l-36.98,37.071l-36.977-37.043c-5.594-5.603-14.654-5.603-20.247,0\n        l-10.124,10.143c-5.594,5.603-5.594,14.679,0,20.282l36.987,37.053l-36.961,37.051c-5.591,5.604-5.591,14.681,0,20.284\n        l10.126,10.141c5.593,5.604,14.654,5.604,20.247,0l36.96-37.05l36.97,37.035c5.592,5.605,14.654,5.605,20.247,0l10.124-10.141\n        c5.593-5.603,5.593-14.68,0-20.282L245.102,143.151z M108.674,48.296L44.747,98.42H17.9c-13.228,0-17.899,4.826-17.899,17.898\n        L0,142.719l0.001,27.295c0,13.072,4.951,17.898,17.899,17.898h26.847l63.927,50.068c7.667,4.948,16.557,6.505,16.557-7.365V55.662\n        C125.23,41.792,116.341,43.349,108.674,48.296z"/>\n    </g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>\n  </svg>\n'),
              (t.settingsSVG =
                '\n  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19">\n    <path fill="#999" fill-rule="nonzero" d="M17.812 7.52h-1.474a7.09 7.09 0 0 0-.604-1.456l1.043-1.042a1.187 1.187 0 0 0 0-1.68l-1.12-1.118a1.188 1.188 0 0 0-1.68 0l-1.043 1.042a7.05 7.05 0 0 0-1.455-.604V1.188C11.48.531 10.948 0 10.292 0H8.708c-.656 0-1.187.532-1.187 1.188v1.474a7.1 7.1 0 0 0-1.456.604L5.022 2.224a1.187 1.187 0 0 0-1.68 0l-1.12 1.12a1.188 1.188 0 0 0 0 1.68l1.044 1.042c-.256.46-.458.949-.604 1.455H1.188C.531 7.52 0 8.052 0 8.708v1.584c0 .656.532 1.187 1.188 1.187h1.474c.146.507.348.995.604 1.456L2.22 13.979a1.188 1.188 0 0 0 0 1.68l1.12 1.119a1.223 1.223 0 0 0 1.68 0l1.043-1.043c.462.255.95.458 1.457.605v1.472c0 .656.531 1.188 1.187 1.188h1.584c.656 0 1.187-.532 1.187-1.188V16.34c.506-.147.995-.35 1.456-.604l1.043 1.043a1.188 1.188 0 0 0 1.68 0l1.119-1.12a1.187 1.187 0 0 0 0-1.679l-1.043-1.043c.256-.461.458-.95.604-1.456h1.474A1.188 1.188 0 0 0 19 10.29V8.709c0-.656-.532-1.187-1.188-1.187zM9.5 13.459a3.958 3.958 0 1 1 0-7.916 3.958 3.958 0 0 1 0 7.916z"/>\n</svg>\n\n'),
              (t.arrowRightSVG =
                '\n  <svg class="svg arrow" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%" viewBox="0 0 50 80" xml:space="preserve">\n    <polyline fill="none" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" points="0.375,0.375 45.63,38.087 0.375,75.8 "/>\n  </svg>\n'),
              (t.arrowLeftSVG =
                '\n  <svg class="svg arrow" class="svg" width="100%" height="100%" viewBox="0 0 50 80" xml:space="preserve">\n    <polyline fill="none" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" points="45.63,75.8 0.375,38.087 45.63,0.375 "/>\n  </svg> \n'),
              (t.fullScreenSVG =
                '\n <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19">\n    <g fill="#999" fill-rule="nonzero">\n        <path d="M18.802 1.942A1.746 1.746 0 0 0 17.06.2h-4.537a.99.99 0 1 0 0 1.98h4.102c.11 0 .198.088.198.197v2.588a.99.99 0 1 0 1.98 0V1.942zM.198 4.965a.99.99 0 0 0 1.98 0v-2.59a.198.198 0 0 1 .197-.199h4.102a.99.99 0 0 0 0-1.979H1.944C.983.2.204.978.202 1.94L.198 4.965zM18.802 17.056v-3.023a.99.99 0 1 0-1.98 0v2.592c0 .11-.088.198-.197.198h-4.102a.99.99 0 1 0 0 1.98h4.533c.964-.001 1.746-.783 1.746-1.747zM.198 17.056a1.746 1.746 0 0 0 1.746 1.742h4.533a.99.99 0 1 0 0-1.979H2.375a.198.198 0 0 1-.198-.194v-2.592a.99.99 0 1 0-1.98 0v3.023z"/>\n        <rect width="10.651" height="6.117" x="4.174" y="6.441" rx="1.954"/>\n    </g>\n</svg>\n\n'),
              (t.loopSVG =
                '\n<svg xmlns="http://www.w3.org/2000/svg" width="24" height="22" viewBox="0 0 24 22">\n    <g fill="#999" fill-rule="nonzero">\n        <path d="M16.773 15.476H16.3a1.25 1.25 0 0 0 0 2.5h.478a6.944 6.944 0 0 0 .98-13.823.251.251 0 0 1-.208-.246V1.93A1.25 1.25 0 0 0 15.584.906l-4.778 3.341a1.25 1.25 0 0 0 .717 2.274h4.764c2.829 0 4.963 1.925 4.963 4.478a4.482 4.482 0 0 1-4.477 4.477zM6.247 17.845c.12.02.208.124.208.246v1.976a1.249 1.249 0 0 0 1.966 1.024l4.773-3.34a1.251 1.251 0 0 0-.717-2.275H7.713c-2.829 0-4.963-1.925-4.963-4.476a4.482 4.482 0 0 1 4.477-4.479h.478a1.25 1.25 0 1 0 0-2.5h-.478a6.945 6.945 0 0 0-.98 13.824z"/>\n    </g>\n</svg>\n'),
              (t.loadingSVG =
                '<svg class="lds-spinner" style="transform:scale(.3)" width="200px"  height="200px"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style="background: none;"><g transform="rotate(0 50 50)">\n  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#999">\n    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"></animate>\n  </rect>\n</g><g transform="rotate(30 50 50)">\n  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#999">\n    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"></animate>\n  </rect>\n</g><g transform="rotate(60 50 50)">\n  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#999">\n    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"></animate>\n  </rect>\n</g><g transform="rotate(90 50 50)">\n  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#999">\n    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate>\n  </rect>\n</g><g transform="rotate(120 50 50)">\n  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#999">\n    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"></animate>\n  </rect>\n</g><g transform="rotate(150 50 50)">\n  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#999">\n    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate>\n  </rect>\n</g><g transform="rotate(180 50 50)">\n  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#999">\n    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"></animate>\n  </rect>\n</g><g transform="rotate(210 50 50)">\n  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#999">\n    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"></animate>\n  </rect>\n</g><g transform="rotate(240 50 50)">\n  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#999">\n    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"></animate>\n  </rect>\n</g><g transform="rotate(270 50 50)">\n  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#999">\n    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"></animate>\n  </rect>\n</g><g transform="rotate(300 50 50)">\n  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#999">\n    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"></animate>\n  </rect>\n</g><g transform="rotate(330 50 50)">\n  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#999">\n    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate>\n  </rect>\n</g></svg>');
          }),
          f = {
            name: "mc-player",
            set playerName(e) {
              this.name += "-" + e;
            },
          },
          b = function (e, t) {
            var n = {
              default: {
                "settings-background-color": "whitesmoke",
                "hms-background-color": "whitesmoke",
                "background-color": "whitesmoke",
                "grad-height": "0px",
                color: "black",
                "svg-color": "black",
                "loopbar-color": "#808086",
                "speedbar-color": "#999",
                "runningbar-color": "red",
                "cursor-color": "red",
                "speedbar-cursor-color": "red",
                "button-opacity": "1",
                "hover-color": "rgba(200, 200, 200, 0.5)",
                "slider-off-color": "#ccc",
                "slider-on-color": "red",
                "preview-border": "2px solid #fff",
                border: "1px solid rgba(255,255,255,0.2)",
                "controls-border": "none",
                "svg-selected-color": "red",
                "loopbar-boundaries-style::before": "",
                "loopbar-boundaries-style::after": "",
                "theme-style": "",
                "loopbar-boundaries-color": "#808086",
              },
              dark: {
                "settings-background-color": "black",
                "hms-background-color": "black",
                "background-color": "black",
                "grad-height": "0px",
                color: "white",
                "svg-color": "white",
                "loopbar-color": "#808086",
                "speedbar-color": "#999",
                "runningbar-color": "red",
                "cursor-color": "red",
                "speedbar-cursor-color": "red",
                "button-opacity": "1",
                "hover-color": "rgba(90, 90, 90, 0.5)",
                "slider-off-color": "#ccc",
                "slider-on-color": "red",
                "preview-border": "2px solid rgba(0,0,0,1)",
                border: "1px solid rgba(255,255,255,0.2)",
                "controls-border": "none",
                "svg-selected-color": "red",
                "loopbar-boundaries-style::before": "",
                "loopbar-boundaries-style::after": "",
                "theme-style": "",
                "loopbar-boundaries-color": "#808086",
              },
              whiteGold: {
                "settings-background-color": "white",
                "hms-background-color": "white",
                "background-color": "white",
                "grad-height": "0px",
                color: "#a17f1a",
                "svg-color": "#a17f1a",
                "loopbar-color": "#808086",
                "speedbar-color": "#999",
                "runningbar-color": "#a17f1a",
                "cursor-color": "#a17f1a",
                "speedbar-cursor-color": "#a17f1a",
                "button-opacity": "1",
                "hover-color": "rgba(200, 200, 200, 0.5)",
                "slider-off-color": "#ccc",
                "slider-on-color": "#a17f1a",
                "preview-border": "2px solid #808086",
                border: "1px solid rgba(255,255,255,0.2)",
                "controls-border": "none",
                "svg-selected-color": "red",
                "loopbar-boundaries-style::before": "",
                "loopbar-boundaries-style::after": "",
                "theme-style": "",
                "loopbar-boundaries-color": "#808086",
              },
              darkGold: {
                "settings-background-color": "black",
                "hms-background-color": "black",
                "background-color": "black",
                "grad-height": "0px",
                color: "#a17f1a",
                "svg-color": "#a17f1a",
                "loopbar-color": "#808086",
                "speedbar-color": "#999",
                "runningbar-color": "#a17f1a",
                "cursor-color": "#a17f1a",
                "speedbar-cursor-color": "#a17f1a",
                "button-opacity": "1",
                "hover-color": "rgba(90, 90, 90, 0.5)",
                "slider-off-color": "#ccc",
                "slider-on-color": "#a17f1a",
                "preview-border": "2px solid #808086",
                border: "1px solid rgba(255,255,255,0.2)",
                "controls-border": "none",
                "svg-selected-color": "red",
                "loopbar-boundaries-style::before": "",
                "loopbar-boundaries-style::after": "",
                "theme-style": "",
                "loopbar-boundaries-color": "#808086",
              },
              transparent: {
                "background-color": "transparent",
                "settings-background-color": "rgba(0,0,0,0.9)",
                "hms-background-color": "rgba(0,0,0,0.5)",
                "preview-border": "2px solid #fff",
                color: "#e8eaeb",
                "grad-height": "200px",
                "svg-color": "#e8eaeb",
                "loopbar-color": "#cfcfd0",
                "totalbar-color": "#797979",
                "speedbar-color": "#999",
                "runningbar-color": "red",
                "cursor-color": "#9e2d11",
                "cursor-style::before":
                  '\n        box-shadow: 0px 0px 6px 6px red;\n        width: 6px;\n        height: 6px;\n        border-radius: 100%;\n        display: block;\n        content: "";\n        background-color: red;\n        position: relative;\n        left: -2px;\n        top: -2px;\n    ',
                "cursor-style::after":
                  '\n        width: 6px;\n        height: 6px;\n        border-radius: 100%;\n        box-shadow: 0px 0px 6px 6px red;\n        content: "";\n        display: block;\n        position: absolute;\n        background-color: red;\n        right: -2px;\n        bottom: -2px;\n    ',
                "speedbar-cursor-color": "red",
                "button-opacity": "1",
                "hover-color": "rgba(200, 200, 200, 0.5)",
                "slider-off-color": "#ccc",
                "slider-on-color": "red",
                border: "1px solid rgba(255,255,255,0.1)",
                "svg-selected-color": "red",
                "loopbar-boundaries-style":
                  "\n        transform: translate(-50%,-37%);\n        position: absolute;\n        width: 18px;\n        background-color: #ff0000;\n        height: 18px;\n        border-radius: 10px;\n        z-index: 40;\n        position: absolute;\n        width: 18px;\n        background-color: #ff0000;\n        height: 18px;\n        border-radius: 10px;\n        z-index: 40;\n        width: 18px;\n        height: 9px;\n        border-radius: 100%;\n        top: 1.5px;\n    ",
                "loopbar-boundaries-style::before":
                  '\n            width: 16px;\n        height: 5px;\n        background: #ff0000;\n        border-radius: 100%;\n        display: block;\n        content: "";\n        position: relative;\n        left: -2px;\n        top: 2px;\n    ',
                "loopbar-boundaries-style::after":
                  '\n        width: 14px;\n        height: 11px;\n        border-radius: 100%;\n        background: #ff0000;\n        content: "";\n        display: block;\n        position: relative;\n        top: -6px;\n        left: 5px;\n    ',
                "theme-style": "\n        #".concat(
                  t,
                  "-loopbar-start {\n            left: -9px !important;\n            transform: rotate(180deg);\n            top: -2px;\n        }\n    "
                ),
              },
              "mc-green": {
                "background-color": "#141416",
                "settings-background-color": "rgba(0,0,0,0.9)",
                "hms-background-color": "rgba(0,0,0,0.5)",
                "preview-border": "2px solid #254a42",
                color: "#999",
                "grad-height": "0px",
                "svg-color": "#999",
                "loopbar-color": "rgba(0,184,139,0.2)",
                "loopbar-boundaries-color": "#00b88b",
                "totalbar-color": "rgba(255, 255, 255, 0.11)",
                "speedbar-color": "#999",
                "runningbar-color": "#00b88b",
                "cursor-color": "#00b88b",
                "speedbar-cursor-color": "#00b88b",
                "button-opacity": "1",
                "hover-color": "rgba(0,184,139,0.2)",
                "slider-off-color": "#ccc",
                "slider-on-color": "#00b88b",
                border: "1px solid rgba(255,255,255,0.1)",
                "controls-border": "1px solid #151515",
                "svg-selected-color": "#00b88b",
                "loopbar-boundaries-style":
                  "\n        transform: translate(-50%,-37%);\n        position: absolute;\n        width: 18px;\n        background-color: #00b88b;\n        height: 18px;\n        border-radius: 10px;\n        z-index: 40;\n        position: absolute;\n        width: 18px;\n        background-color: #00b88b;\n        height: 18px;\n        border-radius: 10px;\n        z-index: 40;\n        width: 18px;\n        height: 9px;\n        border-radius: 100%;\n        top: 1.5px;\n    ",
                "loopbar-boundaries-style::before":
                  '\n            width: 16px;\n        height: 5px;\n        background: #00b88b;\n        border-radius: 100%;\n        display: block;\n        content: "";\n        position: relative;\n        left: -2px;\n        top: 2px;\n    ',
                "loopbar-boundaries-style::after":
                  '\n        width: 14px;\n        height: 11px;\n        border-radius: 100%;\n        background: #00b88b;\n        content: "";\n        display: block;\n        position: relative;\n        top: -6px;\n        left: 5px;\n    ',
                "theme-style": "\n        #".concat(
                  t,
                  "-loopbar-start {\n            left: -9px !important;\n            transform: rotate(180deg);\n            top: -2px;\n        }\n    "
                ),
              },
              "mc-blue": {
                "background-color": "#141416",
                "settings-background-color": "rgba(0,0,0,0.9)",
                "hms-background-color": "rgba(0,0,0,0.5)",
                "preview-border": "2px solid #254453",
                color: "#999",
                "grad-height": "0px",
                "svg-color": "#999",
                "loopbar-color": "rgba(0,153,225,0.2)",
                "loopbar-boundaries-color": "#0099e1",
                "totalbar-color": "rgba(255, 255, 255, 0.11)",
                "speedbar-color": "#999",
                "runningbar-color": "#0099e1",
                "cursor-color": "#0099e1",
                "speedbar-cursor-color": "#0099e1",
                "button-opacity": "1",
                "hover-color": "rgba(0,153,225,0.2)",
                "slider-off-color": "#ccc",
                "slider-on-color": "#0099e1",
                border: "1px solid rgba(255,255,255,0.1)",
                "controls-border": "1px solid #151515",
                "svg-selected-color": "#0099e1",
                "loopbar-boundaries-style":
                  "\n        transform: translate(-50%,-37%);\n        position: absolute;\n        width: 18px;\n        background-color: #0099e1;\n        height: 18px;\n        border-radius: 10px;\n        z-index: 40;\n        position: absolute;\n        width: 18px;\n        background-color: #0099e1;\n        height: 18px;\n        border-radius: 10px;\n        z-index: 40;\n        width: 18px;\n        height: 9px;\n        border-radius: 100%;\n        top: 1.5px;\n    ",
                "loopbar-boundaries-style::before":
                  '\n            width: 16px;\n        height: 5px;\n        background: #0099e1;\n        border-radius: 100%;\n        display: block;\n        content: "";\n        position: relative;\n        left: -2px;\n        top: 2px;\n    ',
                "loopbar-boundaries-style::after":
                  '\n        width: 14px;\n        height: 11px;\n        border-radius: 100%;\n        background: #0099e1;\n        content: "";\n        display: block;\n        position: relative;\n        top: -6px;\n        left: 5px;\n    ',
                "theme-style": "\n        #".concat(
                  t,
                  "-loopbar-start {\n            left: -9px !important;\n            transform: rotate(180deg);\n            top: -2px;\n        }\n    "
                ),
              },
              "on-top": {
                "background-height": "100%",
                "pointer-event-panel-height": "calc(100% - 44px)",
                "controls-bottom": "0px",
                "settings-panel-bottom": "48px",
                "controls-position": "0px",
              },
              "position-bottom": {
                "background-height": "calc(100% - 44px)",
                "pointer-event-panel-height": "calc(100% - 44px)",
                "controls-bottom": "-0px",
                "settings-panel-bottom": "48px",
                "controls-position": "40px",
              },
            };
            return n[e];
          },
          y = c,
          x = d,
          w = u,
          B = m,
          k = c,
          L = function (e, t, n) {
            if (void 0 !== o(n)) {
              if (!1 === n) {
                (e.elements.volumeBarActive.style.width =
                  100 * e.settings.previousVolume + "%"),
                  e.clip.setVolume(e.settings.previousVolume),
                  (e.settings.volumeMute = !1);
                var s = document.createElement("span");
                (s.innerHTML = v.volumeSVG),
                  e.elements.volumeBtn
                    .getElementsByTagName("svg")[0]
                    .replaceWith(s);
              } else if (!0 === n) {
                (e.settings.volumeMute = !0),
                  (e.elements.volumeBarActive.style.width = "0%"),
                  e.clip.setVolume(0);
                var i = document.createElement("span");
                (i.innerHTML = v.volumeMuteSVG),
                  e.elements.volumeBtn
                    .getElementsByTagName("svg")[0]
                    .replaceWith(i);
              }
              (e.options.muted = e.settings.volumeMute),
                e.eventBroadcast("mute-change", e.settings.volumeMute);
            }
            if (void 0 !== o(t)) {
              if (
                ((e.settings.volume = t),
                e.settings.volume > 0 && (e.settings.previousVolume = t),
                (e.elements.volumeBarActive.style.width =
                  100 * e.settings.volume + "%"),
                e.clip.setVolume(e.settings.volume),
                e.settings.volume > 0)
              ) {
                e.settings.volumeMute = !1;
                var a = document.createElement("span");
                (a.innerHTML = v.volumeSVG),
                  e.elements.volumeBtn
                    .getElementsByTagName("svg")[0]
                    .replaceWith(a);
              } else if (0 === e.settings.volume) {
                e.settings.volumeMute = !0;
                var l = document.createElement("span");
                (l.innerHTML = v.volumeMuteSVG),
                  e.elements.volumeBtn
                    .getElementsByTagName("svg")[0]
                    .replaceWith(l);
              }
              (e.options.volume = e.settings.volume),
                e.eventBroadcast("volume-change", e.settings.volume),
                e.eventBroadcast("mute-change", e.settings.volumeMute);
            }
          },
          M = function (e) {
            var t = !1;
            e.elements.volumeBtn.onclick = function () {
              if (e.settings.volumeMute) {
                (e.elements.volumeBarActive.style.width =
                  100 * e.settings.previousVolume + "%"),
                  e.clip.setVolume(e.settings.previousVolume),
                  (e.settings.volumeMute = !1);
                var t = document.createElement("span");
                (t.innerHTML = v.volumeSVG),
                  e.elements.volumeBtn
                    .getElementsByTagName("svg")[0]
                    .replaceWith(t);
              } else {
                (e.settings.volumeMute = !0),
                  (e.elements.volumeBarActive.style.width = "0%"),
                  e.clip.setVolume(0);
                var n = document.createElement("span");
                (n.innerHTML = v.volumeMuteSVG),
                  e.elements.volumeBtn
                    .getElementsByTagName("svg")[0]
                    .replaceWith(n);
              }
              e.eventBroadcast("volume-change", e.settings.previousVolume),
                e.eventBroadcast("mute-change", e.settings.volumeMute);
            };
            var n = !1;
            (e.elements.volumeBtn.onmouseover = function () {
              (n = !0),
                e.elements.volumeCursor.classList.add(
                  "".concat(e.name, "-volume-cursor-transition")
                ),
                e.elements.volumeBar.classList.add(
                  "".concat(e.name, "-volume-width-transition")
                ),
                e.elements.volumeBarHelper.classList.add(
                  "".concat(e.name, "-volume-width-transition")
                ),
                e.elements.timeDisplay.classList.add(
                  "".concat(e.name, "-time-width-transition")
                );
            }),
              (k("".concat(e.name, "-left-controls")).onmouseout = function () {
                if (n && !t) {
                  var o =
                    event.toElement || event.relatedTarget || event.target;
                  (function (e, t) {
                    var n = t.parentNode;
                    for (; null != n; ) {
                      if (n == e) return !0;
                      n = n.parentNode;
                    }
                    return !1;
                  })(k("".concat(e.name, "-left-controls")), o) ||
                    o === k("".concat(e.name, "-left-controls")) ||
                    ((n = !1),
                    e.elements.volumeCursor.classList.remove(
                      "".concat(e.name, "-volume-cursor-transition")
                    ),
                    e.elements.volumeBar.classList.remove(
                      "".concat(e.name, "-volume-width-transition")
                    ),
                    e.elements.volumeBarHelper.classList.remove(
                      "".concat(e.name, "-volume-width-transition")
                    ),
                    e.elements.timeDisplay.classList.remove(
                      "".concat(e.name, "-time-width-transition")
                    ));
                }
              }),
              (e.listeners.onCursorMoveVolumeBar = function (t) {
                t.preventDefault();
                var n =
                  (t.clientX || ((t.touches || [])[0] || {}).clientX) -
                  e.elements.volumeBarHelper.getBoundingClientRect().left;
                if (
                  (n < 0
                    ? (n = 0)
                    : n > e.elements.volumeBarHelper.offsetWidth &&
                      (n = e.elements.volumeBarHelper.offsetWidth),
                  (e.settings.volume = Number(
                    (n / e.elements.volumeBarHelper.offsetWidth).toFixed(2)
                  )),
                  (e.elements.volumeBarActive.style.width =
                    100 * e.settings.volume + "%"),
                  e.clip.setVolume(e.settings.volume),
                  e.settings.volume > 0)
                ) {
                  e.settings.volumeMute = !1;
                  var o = document.createElement("span");
                  (o.innerHTML = v.volumeSVG),
                    e.elements.volumeBtn
                      .getElementsByTagName("svg")[0]
                      .replaceWith(o);
                } else if (0 === e.settings.volume) {
                  e.settings.volumeMute = !0;
                  var s = document.createElement("span");
                  (s.innerHTML = v.volumeMuteSVG),
                    e.elements.volumeBtn
                      .getElementsByTagName("svg")[0]
                      .replaceWith(s);
                }
                e.eventBroadcast("volume-change", e.settings.volume),
                  e.eventBroadcast("mute-change", e.settings.volumeMute);
              }),
              (e.listeners.onMouseUpVolumeBar = function (n) {
                (t = !1),
                  (e.elements.listenerHelper.style.pointerEvents = "none"),
                  n.preventDefault(),
                  e.settings.volume > 0 &&
                    (e.settings.previousVolume = e.settings.volume),
                  B("mouseup", e.listeners.onMouseUpVolumeBar, !1),
                  B("touchend", e.listeners.onMouseUpVolumeBar, !1),
                  B("mousemove", e.listeners.onCursorMoveVolumeBar, !1),
                  B("touchmove", e.listeners.onCursorMoveVolumeBar, !1);
              }),
              (e.listeners.onMouseDownVolumeBar = function (n) {
                (t = !0),
                  (e.elements.listenerHelper.style.pointerEvents = "auto"),
                  n.preventDefault(),
                  e.listeners.onCursorMoveVolumeBar(n),
                  w("mouseup", e.listeners.onMouseUpVolumeBar, !1),
                  w("touchend", e.listeners.onMouseUpVolumeBar, !1),
                  w("mousemove", e.listeners.onCursorMoveVolumeBar, !1),
                  w("touchmove", e.listeners.onCursorMoveVolumeBar, !1);
              }),
              e.elements.volumeBarHelper.addEventListener(
                "mousedown",
                e.listeners.onMouseDownVolumeBar,
                !1
              ),
              e.elements.volumeCursor.addEventListener(
                "mousedown",
                e.listeners.onMouseDownVolumeBar,
                !1
              ),
              e.elements.volumeBarHelper.addEventListener(
                "touchstart",
                e.listeners.onMouseDownVolumeBar,
                { passive: !1 },
                !1
              ),
              e.elements.volumeCursor.addEventListener(
                "touchstart",
                e.listeners.onMouseDownVolumeBar,
                { passive: !1 },
                !1
              );
          };
        var E = u,
          T = m,
          S = u,
          C = m,
          V = u,
          P = m,
          z = c,
          H = u,
          D = m,
          N = function (e, t) {
            t && t.preventDefault();
            var n = z("".concat(e.name, "-show-indicator-checkbox"));
            n.checked
              ? ((n.checked = !1),
                (e.elements.indicator.style.visibility = "hidden"))
              : ((n.checked = !0),
                (e.elements.indicator.style.visibility = "visible")),
              e.eventBroadcast("show-indicator-change", n.checked);
          },
          W = function (e, t) {
            t && t.preventDefault();
            var n = z("".concat(e.name, "-pointer-events-checkbox"));
            n.checked
              ? ((n.checked = !1),
                (e.elements.mcPlayer.style.pointerEvents = "none"),
                (e.elements.pointerEventPanel.style.pointerEvents = "auto"),
                (z("".concat(e.name, "-controls")).style.pointerEvents =
                  "auto"),
                (e.elements.settingsPanel.style.pointerEvents = "auto"))
              : ((n.checked = !0),
                (e.options.pointerEvents = !1),
                (e.elements.mcPlayer.style.pointerEvents = "none"),
                (e.elements.pointerEventPanel.style.pointerEvents = "none"),
                (z("".concat(e.name, "-controls")).style.pointerEvents =
                  "auto"),
                (e.elements.settingsPanel.style.pointerEvents = "auto")),
              e.eventBroadcast("show-pointer-events-change", n.checked);
          },
          F = function (e, t) {
            t && t.preventDefault(),
              e.elements.volumeControl.classList.toggle(
                "".concat(e.name, "-volume-width-transition")
              ),
              e.elements.volumeControl.classList.toggle(
                "".concat(e.name, "-hide")
              );
            var n = z("".concat(e.name, "-show-volume-checkbox"));
            n.checked
              ? ((n.checked = !1),
                (e.elements.volumeControl.style.visibility = "hidden"),
                (e.elements.timeDisplay.style.left = "45px"))
              : ((n.checked = !0),
                (e.elements.volumeControl.style.visibility = "visible"),
                (e.elements.timeDisplay.style.left = "")),
              e.eventBroadcast("show-volume-change", n.checked);
          },
          I = function (e, t) {
            t && t.preventDefault();
            var n = z("".concat(e.name, "-show-preview-checkbox"));
            n.checked
              ? ((n.checked = !1),
                (z("".concat(e.name, "-hover-display")).style.visibility =
                  "hidden"),
                (z("".concat(e.name, "-hover-display")).style.display = "none"),
                (e.options.preview = !1))
              : (e.previewClip || e.createPreviewDisplay(),
                (n.checked = !0),
                (z("".concat(e.name, "-hover-display")).style.visibility =
                  "visible"),
                (z("".concat(e.name, "-hover-display")).style.display = "flex"),
                (e.options.preview = !0)),
              e.eventBroadcast("show-preview-change", n.checked);
          },
          O = function (e) {
            (e.elements.settingsShowIndicator.onclick = function (t) {
              return N(e, t);
            }),
              (e.elements.settingsPointerEvents.onclick = function (t) {
                return W(e, t);
              }),
              (e.elements.settingsShowVolume.onclick = function (t) {
                return F(e, t);
              }),
              (e.elements.settingsShowPreview.onclick = function (t) {
                return I(e, t);
              }),
              (e.elements.settingsButton.onclick = function (t) {
                t.preventDefault();
                var n = z("".concat(e.name, "-controls")),
                  o = function t(n) {
                    if (e.elements.settingsPanel.contains(n.target)) return !0;
                    e.elements.settingsPanel.classList.toggle(
                      "".concat(e.name, "-hide")
                    ),
                      e.elements.settingsPanel.classList.toggle("m-fadeOut"),
                      e.elements.settingsPanel.classList.toggle("m-fadeIn"),
                      e.elements.settingsPanel.className.includes(
                        "m-fadeOut"
                      ) &&
                        (D("click", t, !1),
                        e.eventBroadcast("state-change", e.state));
                  };
                e.elements.settingsPanel.className.includes("m-fadeOut")
                  ? (n.classList.value.includes("force-show-controls") ||
                      n.classList.toggle("force-show-controls"),
                    H("click", o, !1))
                  : D("click", o, !1);
              });
          },
          A = function (e, t) {
            "showIndicator" === t
              ? N(e)
              : "showPointerEvents" === t
              ? W(e)
              : "showVolume" === t
              ? F(e)
              : "showPreview" === t && I(e);
          },
          G = c,
          U = u,
          R = m,
          j = function (e) {
            e.elements.settingsSpeedButtonShow.onclick = e.elements.settingsSpeedButtonHide.onclick = function (
              t
            ) {
              t.preventDefault(),
                e.elements.settingsPanel.classList.toggle(
                  "".concat(e.name, "-settings-speed-panel")
                ),
                e.elements.settingsPanel.className.includes(
                  "".concat(e.name, "-settings-speed-panel")
                )
                  ? ((e.elements.settingsMainPanel.style.display = "none"),
                    (e.elements.settingsSpeedPanel.style.display = "block"))
                  : ((e.elements.settingsSpeedPanel.style.display = "none"),
                    (e.elements.settingsMainPanel.style.display = "block"));
            };
            var t = function (t) {
                t.preventDefault();
                var n = e.elements.speedBar.getBoundingClientRect(),
                  o =
                    (t.clientY || ((t.touches || [])[0] || {}).clientY) - n.top;
                (o -= 8) < 0
                  ? (o = 0)
                  : o > e.elements.speedBar.offsetHeight - 16 &&
                    (o = e.elements.speedBar.offsetHeight - 16);
                var s =
                    -1 *
                    ((o = Math.floor(o)) /
                      (16 * (e.options.speedValues.length - 1)) -
                      1),
                  i = 1 / (e.options.speedValues.length - 1),
                  a = e.calculateSpeed(i, e.options.speedValues, s);
                (G("".concat(e.name, "-speed-runtime")).innerHTML = a + "0"),
                  (G("".concat(e.name, "-speed-cursor")).style.top = o + "px"),
                  (e.clip.executionSpeed = a),
                  e.eventBroadcast("speed-change", e.clip.executionSpeed);
              },
              n = function n(o) {
                var s;
                (e.elements.listenerHelper.style.pointerEvents = "none"),
                  o.preventDefault(),
                  R("mouseup", n, !1),
                  R("touchend", n, !1),
                  R("mousemove", t, !1),
                  R("touchmove", t, !1),
                  (G("".concat(e.name, "-speed-runtime")).innerHTML = "Speed"),
                  (s = 1 == e.clip.speed ? "Normal" : e.clip.speed),
                  (e.elements.speedCurrent.innerHTML = s);
              },
              o = function (o) {
                (e.elements.listenerHelper.style.pointerEvents = "auto"),
                  o.preventDefault(),
                  t(o),
                  U("mouseup", n, !1),
                  U("touchend", n, !1),
                  U("mousemove", t, !1),
                  U("touchmove", t, !1);
              };
            e.elements.speedBarHelper.addEventListener("mousedown", o, !1),
              e.elements.speedBarHelper.addEventListener(
                "touchstart",
                o,
                { passive: !1 },
                !1
              );
          },
          X = function (e, t) {
            var n;
            (t = parseFloat(t) || 1),
              e.eventBroadcast("speed-change", t),
              (n = 1 == t ? "Normal" : t),
              (e.clip.executionSpeed = t),
              (e.elements.speedCurrent.innerHTML = n);
          },
          J = c,
          q = function (e) {
            (e.settings.loopActivated = !e.settings.loopActivated),
              e.eventBroadcast("loop-change", e.settings.loopActivated),
              e.elements.loopButton.classList.toggle("svg-selected"),
              e.elements.loopBarStart.classList.toggle("m-fadeOut"),
              e.elements.loopBarEnd.classList.toggle("m-fadeOut"),
              e.elements.loopBarStart.classList.toggle("m-fadeIn"),
              e.elements.loopBarStart.classList.toggle(
                "".concat(e.name, "-hide")
              ),
              e.elements.loopBarEnd.classList.toggle("m-fadeIn"),
              e.elements.loopBarEnd.classList.toggle(
                "".concat(e.name, "-hide")
              ),
              J("".concat(e.name, "-loop-time")).classList.toggle("m-fadeOut"),
              J("".concat(e.name, "-loop-time")).classList.toggle("m-fadeIn"),
              J("".concat(e.name, "-loop-time")).classList.toggle(
                "".concat(e.name, "-hide")
              ),
              (e.elements.loopEndTime.innerHTML =
                e.settings.loopEndMillisecond),
              (e.elements.loopStartTime.innerHTML =
                e.settings.loopStartMillisecond),
              (e.settings.needsUpdate = !0),
              e.settings.loopActivated ||
                ((e.elements.loopBar.style.left = "0%"),
                (e.elements.loopBar.style.width = "100%"),
                (e.settings.loopStartMillisecond = 0),
                (e.settings.loopEndMillisecond = e.clip.duration),
                (e.settings.loopLastPositionXPxls = 0),
                (e.settings.loopLastPositionXPercentage = 0),
                (e.elements.runningBar.style.width =
                  (e.clip.runTimeInfo.currentMillisecond / e.clip.duration) *
                    100 +
                  "%"));
          },
          Y = q,
          _ = function (e) {
            e.elements.loopButton.onclick = function () {
              return q(e);
            };
          },
          K = c;
        function Q(e, t) {
          for (var n = t.parentNode; null != n; ) {
            if (n == e) return !0;
            n = n.parentNode;
          }
          return !1;
        }
        var Z = function (e) {
            var t = e.clip.props.host.className.includes("full-screen");
            e.clip.props.host !== e.options.host &&
              !t &&
              e.clip.props.host.appendChild(e.elements.mcPlayer),
              e.clip.props.host !== e.options.host &&
                t &&
                e.options.host.appendChild(e.elements.mcPlayer),
              t
                ? e.exitFullscreen()
                : e.launchIntoFullscreen(e.clip.props.host);
          },
          $ = Z,
          ee = function (e) {
            e.elements.fullScreenButton.onclick = function () {
              return Z(e);
            };
          },
          te = g,
          ne = c,
          oe = u,
          se = m,
          ie = r,
          ae = c,
          le = new n.default.TimeCapsule(),
          re = c,
          ce = p,
          pe = d,
          de = h;
        return (function () {
          function e(t) {
            var n,
              o = this;
            for (var s in ((function (e, t) {
              if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function");
            })(this, e),
            (t.id = t.id || Date.now()),
            (t.preview = t.preview || !1),
            (t.showVolume = t.showVolume || !1),
            (t.showIndicator = t.showIndicator || !1),
            (t.theme = t.theme || "transparent on-top"),
            (t.host = t.host || t.clip.props.host),
            (t.buttons = t.buttons || {}),
            (t.timeFormat = t.timeFormat || "ss"),
            (t.backgroundColor = t.backgroundColor || "black"),
            (t.fullscreen = t.fullscreen || !1),
            (t.scaleToFit = null === (n = t.scaleToFit) || void 0 === n || n),
            void 0 === t.pointerEvents || null === t.pointerEvents
              ? (t.pointerEvents = !1)
              : (t.pointerEvents = Boolean(t.pointerEvents)),
            (t.onMillisecondChange = t.onMillisecondChange || null),
            (t.speedValues = t.speedValues || [-2, -1, -0.5, 0, 0.5, 1, 2]),
            (t.muted = t.muted || !1),
            (t.controls = 0 != t.controls),
            (t.loop = t.loop || !1),
            (t.volume = void 0 !== t.volume ? t.volume : 1),
            (t.currentScript = t.currentScript || null),
            t.speedValues))
              isFinite(t.speedValues[s]) || t.speedValues.splice(s, 1);
            t.speedValues.sort(function (e, t) {
              return e - t;
            }),
              (this.className = f.name),
              (f.playerName = t.id),
              (this.options = t),
              (this.id = this.options.id),
              (this.name = f.name),
              (this.previewClip = null),
              (this.clip = t.clip),
              (this.clipClass = t.clipClass),
              (this.state = this.clip.runTimeInfo.state),
              (this.listeners = {}),
              (this.previewScale = 0.25),
              (this.settings = {
                volume: 1,
                journey: null,
                previousVolume: 1,
                volumeMute: !1,
                needsUpdate: !0,
                resizeLoop: !1,
                loopJourney: !1,
                previewJourney: null,
                loopActivated: !1,
                requestingLoop: !1,
                playAfterResize: !1,
                loopStartMillisecond: 0,
                loopLastPositionXPxls: 0,
                loopLastPositionXPercentage: 0,
                loopEndMillisecond: this.clip.duration,
                controls: !0,
              }),
              (function (e) {
                e.elements = {};
                var t = e.clip.props.host;
                t.offsetWidth ||
                  (t.style.width = e.clip.props.containerParams.width),
                  t.offsetHeight ||
                    (t.style.height = e.clip.props.containerParams.height);
                var n = document.createElement("link");
                (n.rel = "preconnect"), (n.href = "https://fonts.gstatic.com");
                var o = document.createElement("link");
                (o.rel = "stylesheet"),
                  (o.href =
                    "https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap");
                var s = document.getElementsByTagName("head")[0];
                if (
                  (s.appendChild(n),
                  s.appendChild(o),
                  (t.style.display = "flex"),
                  (t.style.justifyContent = "center"),
                  (t.style.alignItems = "center"),
                  (t.style.overflow = "hidden"),
                  (e.clip.props.host.style.position = "relative"),
                  (e.clip.props.host.style.zIndex = "0"),
                  (e.elements.mcPlayer = x("div")),
                  (e.elements.mcPlayer.id = "".concat(e.name)),
                  (e.elements.mcPlayer.className = "".concat(e.className)),
                  (e.elements.mcPlayer.innerHTML = (function (e) {
                    return '\n  <div\n    class="pointer-event-panel"\n    id="'
                      .concat(
                        e.name,
                        '-pointer-event-panel"\n  ></div>\n  <div\n    class="pointer-event-panel"\n    id="'
                      )
                      .concat(
                        e.name,
                        '-listener-helper"\n  ></div>\n  <div class="background"></div>\n  <div id="'
                      )
                      .concat(
                        e.name,
                        '-controls">\n    <div class="grad"></div>\n    <div id="'
                      )
                      .concat(e.name, '-totalbar">\n      <div id="')
                      .concat(e.name, '-hover-display">\n        <div id="')
                      .concat(
                        e.name,
                        '-hover-display-border"> </div>\n        <div id="'
                      )
                      .concat(
                        e.name,
                        '-hover-display-clip"> </div>\n        <div id="'
                      )
                      .concat(
                        e.name,
                        '-hover-millisecond"></div>\n      </div>\n      <div id="'
                      )
                      .concat(
                        e.name,
                        '-loopbar">\n        <div\n          class="'
                      )
                      .concat(e.name, '-loop-boundaries"\n          id="')
                      .concat(
                        e.name,
                        '-loopbar-start"\n        ></div>\n        <div\n          class="'
                      )
                      .concat(e.name, '-loop-boundaries"\n          id="')
                      .concat(
                        e.name,
                        '-loopbar-end"\n        ></div>\n        <div id="'
                      )
                      .concat(e.name, '-helperbar"></div>\n        <div id="')
                      .concat(e.name, '-runningbar">\n          <div id="')
                      .concat(
                        e.name,
                        '-cursor"></div>\n        </div>\n      </div>\n    </div>\n    <div id="'
                      )
                      .concat(e.name, '-left-controls">\n      <div id="')
                      .concat(e.name, '-status-btn">\n        ')
                      .concat(e.svg.playSVG, '\n        <span id="')
                      .concat(
                        e.name,
                        '-indicator"></span>\n      </div>\n      <div id="'
                      )
                      .concat(e.name, '-volume">\n        <div id="')
                      .concat(e.name, '-volume-btn">\n          ')
                      .concat(
                        e.svg.volumeSVG,
                        '\n        </div>\n        <div id="'
                      )
                      .concat(
                        e.name,
                        '-volumebar-helper"></div>\n        <div id="'
                      )
                      .concat(e.name, '-volumebar">\n            <div id="')
                      .concat(
                        e.name,
                        '-volumebar-active">\n              <div id="'
                      )
                      .concat(
                        e.name,
                        '-volume-cursor"></div>\n            </div>\n        </div>\n      </div>\n      <div id="'
                      )
                      .concat(e.name, '-time-display">\n        <span id="')
                      .concat(
                        e.name,
                        '-time-current"></span>\n        <span id="'
                      )
                      .concat(
                        e.name,
                        '-time-separator"></span>\n        <span id="'
                      )
                      .concat(
                        e.name,
                        '-time-total"></span>\n      </div>\n    </div>\n    <div id="'
                      )
                      .concat(
                        e.name,
                        '-right-controls">\n      <div\n        id="'
                      )
                      .concat(
                        e.name,
                        '-loop-btn-container"\n      >\n        <div\n          id="'
                      )
                      .concat(e.name, '-loop-btn"\n        >')
                      .concat(
                        e.svg.loopSVG,
                        '</div>\n        <div\n          id="'
                      )
                      .concat(
                        e.name,
                        '-loop-time"\n        >\n          <span\n            id="'
                      )
                      .concat(
                        e.name,
                        '-loopbar-start-time"\n            class="'
                      )
                      .concat(
                        e.name,
                        '-loopbar-time"\n          ></span>\n          <span>:</span>\n          <span\n            id="'
                      )
                      .concat(e.name, '-loopbar-end-time"\n            class="')
                      .concat(
                        e.name,
                        '-loopbar-time"\n          ></span>\n        </div>\n      </div>\n      <div\n        id="'
                      )
                      .concat(e.name, '-settings-btn"\n      >')
                      .concat(
                        e.svg.settingsSVG,
                        '</div>\n      <div\n        id="'
                      )
                      .concat(e.name, '-dc-btn"\n      >\n        ')
                      .concat(
                        e.svg.dcSVG,
                        '\n      </div>\n      \n      <div\n        id="'
                      )
                      .concat(e.name, '-full-screen-btn"\n      >')
                      .concat(
                        e.svg.fullScreenSVG,
                        '</div>\n    </div>\n    \n\n  </div>\n  <div id="'
                      )
                      .concat(e.name, '-settings-panel">\n    <ul id="')
                      .concat(e.name, '-main-settings">\n      <li id="')
                      .concat(
                        e.name,
                        '-settings-pointer-events">\n        <label>Pointer Events</label>\n        <label class="switch settings-switch">\n          <input id="'
                      )
                      .concat(
                        e.name,
                        '-pointer-events-checkbox" type="checkbox">\n          <span class="slider round"></span>\n        </label>\n      </li>\n      <li id="'
                      )
                      .concat(
                        e.name,
                        '-settings-preview">\n        <label>Show Preview</label>\n        <label class="switch settings-switch">\n          <input id="'
                      )
                      .concat(
                        e.name,
                        '-show-preview-checkbox" type="checkbox">\n          <span class="slider round"></span>\n        </label>\n      </li>\n      <li id="'
                      )
                      .concat(
                        e.name,
                        '-settings-indicator">\n        <label>Show Indicator</label>\n        <label class="switch settings-switch">\n          <input id="'
                      )
                      .concat(
                        e.name,
                        '-show-indicator-checkbox" type="checkbox">\n          <span class="slider round"></span>\n        </label>\n      </li>\n      <li id="'
                      )
                      .concat(
                        e.name,
                        '-settings-volume">\n        <label>Show Volume</label>\n        <label class="switch settings-switch">\n          <input id="'
                      )
                      .concat(
                        e.name,
                        '-show-volume-checkbox" type="checkbox">\n          <span class="slider round"></span>\n        </label>\n      </li>\n      <li id="'
                      )
                      .concat(
                        e.name,
                        '-settings-speed-show">\n        <label>Speed</label>\n        <div class="'
                      )
                      .concat(e.name, '-speed-btn">')
                      .concat(e.svg.arrowRightSVG, '</div>\n        <span id="')
                      .concat(
                        e.name,
                        '-speed-current"></span>\n      </li>\n    </ul>\n    <ul id="'
                      )
                      .concat(e.name, '-speed-settings">\n      <li id="')
                      .concat(
                        e.name,
                        '-settings-speed-hide">\n        <div class="'
                      )
                      .concat(e.name, '-speed-btn">')
                      .concat(e.svg.arrowLeftSVG, "</div>\n        <label id=")
                      .concat(
                        e.name,
                        '-speed-runtime>Speed</label>\n      </li>\n      <li>\n        <div id="'
                      )
                      .concat(
                        e.name,
                        '-speed-value-helperbar"></div>\n        <div id="'
                      )
                      .concat(
                        e.name,
                        '-speed-value-bar">\n          <div\n            class="'
                      )
                      .concat(e.name, '-speed-value-step"\n            id="')
                      .concat(
                        e.name,
                        '-speed-cursor"\n          >\n            <div></div>\n          </div>\n        </div>\n        <div id="'
                      )
                      .concat(
                        e.name,
                        '-speed-value">\n        </div>\n      </li>\n    </ul>\n  </div>\n'
                      );
                  })({ svg: v, name: e.name })),
                  "string" == typeof e.options.host)
                ) {
                  var i = document.querySelectorAll(e.options.host);
                  for (var a in i)
                    isNaN(a) || i[a].appendChild(e.elements.mcPlayer);
                } else e.options.host.appendChild(e.elements.mcPlayer);
                for (var l in ((e.elements.pointerEventPanel = y(
                  "".concat(e.name, "-pointer-event-panel")
                )),
                (e.elements.listenerHelper = y(
                  "".concat(e.name, "-listener-helper")
                )),
                (e.elements.loopBar = y("".concat(e.name, "-loopbar"))),
                (e.elements.totalBar = y("".concat(e.name, "-totalbar"))),
                (e.elements.indicator = y("".concat(e.name, "-indicator"))),
                (e.elements.loopButton = y("".concat(e.name, "-loop-btn"))),
                (e.elements.volumeBar = y("".concat(e.name, "-volumebar"))),
                (e.elements.totalTime = y("".concat(e.name, "-time-total"))),
                (e.elements.volumeControl = y("".concat(e.name, "-volume"))),
                (e.elements.volumeBtn = y("".concat(e.name, "-volume-btn"))),
                (e.elements.runningBar = y("".concat(e.name, "-runningbar"))),
                (e.elements.loopBarEnd = y("".concat(e.name, "-loopbar-end"))),
                (e.elements.statusButton = y("".concat(e.name, "-status-btn"))),
                (e.elements.speedBar = y(
                  "".concat(e.name, "-speed-value-bar")
                )),
                (e.elements.currentTime = y(
                  "".concat(e.name, "-time-current")
                )),
                (e.elements.timeDisplay = y(
                  "".concat(e.name, "-time-display")
                )),
                (e.elements.speedCurrent = y(
                  "".concat(e.name, "-speed-current")
                )),
                (e.elements.loopBarStart = y(
                  "".concat(e.name, "-loopbar-start")
                )),
                (e.elements.volumeCursor = y(
                  "".concat(e.name, "-volume-cursor")
                )),
                (e.elements.settingsButton = y(
                  "".concat(e.name, "-settings-btn")
                )),
                (e.elements.donkeyclipButton = y("".concat(e.name, "-dc-btn"))),
                (e.elements.timeSeparator = y(
                  "".concat(e.name, "-time-separator")
                )),
                (e.elements.settingsPanel = y(
                  "".concat(e.name, "-settings-panel")
                )),
                (e.elements.settingsMainPanel = y(
                  "".concat(e.name, "-main-settings")
                )),
                (e.elements.fullScreenButton = y(
                  "".concat(e.name, "-full-screen-btn")
                )),
                (e.elements.volumeBarHelper = y(
                  "".concat(e.name, "-volumebar-helper")
                )),
                (e.elements.volumeBarActive = y(
                  "".concat(e.name, "-volumebar-active")
                )),
                (e.elements.settingsSpeedPanel = y(
                  "".concat(e.name, "-speed-settings")
                )),
                (e.elements.settingsShowVolume = y(
                  "".concat(e.name, "-settings-volume")
                )),
                (e.elements.settingsShowPreview = y(
                  "".concat(e.name, "-settings-preview")
                )),
                (e.elements.settingsPointerEvents = y(
                  "".concat(e.name, "-settings-pointer-events")
                )),
                (e.elements.speedBarHelper = y(
                  "".concat(e.name, "-speed-value-helperbar")
                )),
                (e.elements.settingsShowIndicator = y(
                  "".concat(e.name, "-settings-indicator")
                )),
                (e.elements.settingsSpeedButtonShow = y(
                  "".concat(e.name, "-settings-speed-show")
                )),
                (e.elements.settingsSpeedButtonHide = y(
                  "".concat(e.name, "-settings-speed-hide")
                )),
                (e.elements.volumeBarActive.style.width =
                  100 * e.settings.volume + "%"),
                (e.elements.currentTime.innerHTML = e.timeFormat(0)),
                (e.elements.totalTime.innerHTML = e.timeFormat(
                  e.clip.duration
                )),
                (e.elements.timeSeparator.innerHTML = "/"),
                e.elements.settingsPanel.classList.add(
                  "m-fadeOut",
                  "".concat(e.name, "-hide")
                ),
                e.options.showIndicator
                  ? ((e.elements.indicator.style.visibility = "visible"),
                    (e.elements.statusButton.style.width = "35px"),
                    (e.elements.statusButton.style.height = "20px"),
                    (e.elements.statusButton.style.bottom = "5px"))
                  : (e.elements.indicator.style.visibility = "hidden"),
                (e.elements.indicator.innerHTML = e.clip.runTimeInfo.state),
                (e.elements.settingsSpeedPanel.style.display = "none"),
                e.elements.settingsSpeedPanel
                  .getElementsByTagName("li")[1]
                  .classList.add("no-hover"),
                (e.elements.loopBarStart.style.left = "0%"),
                e.elements.loopBarStart.classList.add(
                  "m-fadeOut",
                  "".concat(e.name, "-hide")
                ),
                (e.elements.loopBarEnd.style.left = "100%"),
                e.elements.loopBarEnd.classList.add(
                  "m-fadeOut",
                  "".concat(e.name, "-hide")
                ),
                (e.elements.loopStartTime = y(
                  "".concat(e.name, "-loopbar-start-time")
                )),
                (e.elements.loopEndTime = y(
                  "".concat(e.name, "-loopbar-end-time")
                )),
                (e.elements.editableLoopStartTime = document.createElement(
                  "input"
                )),
                (e.elements.editableLoopStartTime.type = "text"),
                (e.elements.editableLoopStartTime.size =
                  y("".concat(e.name, "-time-total")).innerHTML.length + 1),
                (e.elements.editableLoopStartTime.maxLength = y(
                  "".concat(e.name, "-time-total")
                ).innerHTML.length),
                (e.elements.editableLoopStartTime.style.height = y(
                  "".concat(e.name, "-time-total")
                ).offsetHeight),
                (e.elements.editableLoopStartTime.value = y(
                  "".concat(e.name, "-loopbar-start-time")
                ).innerHTML),
                (e.elements.editableLoopStartTime.style.fontSize = "8px"),
                (e.elements.editableLoopEndTime = document.createElement(
                  "input"
                )),
                (e.elements.editableLoopEndTime.type = "text"),
                (e.elements.editableLoopEndTime.size =
                  y("".concat(e.name, "-time-total")).innerHTML.length + 1),
                (e.elements.editableLoopEndTime.maxLength = y(
                  "".concat(e.name, "-time-total")
                ).innerHTML.length),
                (e.elements.editableLoopEndTime.style.height = y(
                  "".concat(e.name, "-time-total")
                ).offsetHeight),
                (e.elements.editableLoopEndTime.value = y(
                  "".concat(e.name, "-loopbar-start-time")
                ).innerHTML),
                (e.elements.editableLoopEndTime.pattern = "d*"),
                (e.elements.editableLoopEndTime.style.fontSize = "8px"),
                y("".concat(e.name, "-loop-time")).classList.add(
                  "m-fadeOut",
                  "".concat(e.name, "-hide")
                ),
                y("".concat(e.name, "-hover-display")).classList.add(
                  "m-fadeOut"
                ),
                (y("".concat(e.name, "-show-volume-checkbox")).checked =
                  e.options.showVolume),
                (y("".concat(e.name, "-show-indicator-checkbox")).checked =
                  e.options.showIndicator),
                (y("".concat(e.name, "-show-preview-checkbox")).checked =
                  e.options.preview),
                (y("".concat(e.name, "-pointer-events-checkbox")).checked =
                  e.options.pointerEvents),
                e.options.pointerEvents
                  ? ((e.elements.mcPlayer.style.pointerEvents = "none"),
                    (e.elements.pointerEventPanel.style.pointerEvents = "none"),
                    (y("".concat(e.name, "-controls")).style.pointerEvents =
                      "auto"),
                    (e.elements.settingsPanel.style.pointerEvents = "auto"))
                  : ((e.elements.mcPlayer.style.pointerEvents = "none"),
                    (e.elements.pointerEventPanel.style.pointerEvents = "auto"),
                    (y("".concat(e.name, "-controls")).style.pointerEvents =
                      "auto"),
                    (e.elements.settingsPanel.style.pointerEvents = "auto")),
                (e.elements.listenerHelper.style.pointerEvents = "none"),
                e.options.showVolume
                  ? ((e.elements.timeDisplay.style.left = ""),
                    (e.elements.volumeControl.style.visibility = "visible"))
                  : ((e.elements.timeDisplay.style.left = "45px"),
                    (e.elements.volumeControl.style.visibility = "hidden"),
                    e.elements.volumeControl.classList.toggle(
                      "".concat(e.name, "-hide")
                    ),
                    e.elements.volumeControl.classList.toggle(
                      "".concat(e.name, "-volume-width-transition")
                    )),
                e.options.speedValues)) {
                  var r = x("div");
                  r.className = "".concat(e.name, "-speed-value-step");
                  var c = x("div");
                  (c.className = "".concat(e.name, "-speed-value")),
                    (c.dataset.speedValue = e.options.speedValues[l]),
                    (c.innerHTML = e.options.speedValues[l]),
                    (c.dataset.zone = l),
                    y("".concat(e.name, "-speed-value")).prepend(c),
                    e.elements.speedBar.prepend(r);
                }
                !1 === e.options.buttons.fullScreen &&
                  e.elements.fullScreenButton.remove(),
                  !1 === e.options.buttons.settings &&
                    e.elements.settingsButton.remove(),
                  !1 === e.options.buttons.donkeyclip &&
                    e.elements.donkeyclipButton.remove(),
                  !1 === e.options.buttons.loop &&
                    e.elements.loopButton.remove();
              })(this),
              this.setTheme(),
              this.setSpeed(),
              this.subscribeToTimer(),
              this.subscribeToDurationChange(),
              this.addEventListeners(),
              this.scaleClipHost(),
              this.eventBroadcast("state-change", this.state),
              this.options.preview && this.createPreviewDisplay(),
              (this.resizeTimeout = setTimeout(function () {}, 20)),
              window.addEventListener("resize", function () {
                clearTimeout(o.resizeTimeout),
                  (o.resizeTimeout = setTimeout(function () {
                    o.options.preview && o.setPreviewDimentions(),
                      o.options.scaleToFit && o.scaleClipHost();
                  }, 20));
              }),
              this.changeSettings(t, !0);
          }
          var t, n, o;
          return (
            (t = e),
            (n = [
              {
                key: "changeSettings",
                value: function (e, t) {
                  (e.theme = e.theme || "transparent on-top"),
                    (e.speed = e.speed || 1),
                    (e.volume = e.volume || 1),
                    (e.clip = e.clip || this.clip),
                    e.clip !== this.options.clip &&
                      ((t = !0),
                      (this.clip = e.clip),
                      (this.options.clip = e.clip)),
                    !1 === e.controls
                      ? (re(this.name).style.display = "none")
                      : !0 === e.controls &&
                        (re(this.name).style.display = "unset"),
                    void 0 !== e.loop &&
                      (this.options.loop !== e.loop ||
                        (t && this.options.loop)) &&
                      Y(this),
                    void 0 !== e.fullscreen &&
                      (this.options.fullscreen !== e.fullscreen ||
                        (t && this.options.fullscreen)) &&
                      $(this),
                    void 0 !== e.muted &&
                      (this.options.muted !== e.muted ||
                        (t && this.options.muted)) &&
                      L(this, void 0, e.mute),
                    void 0 !== e.volume &&
                      (this.options.volume !== e.volume ||
                        (t && this.options.volume)) &&
                      L(this, e.volume, void 0),
                    void 0 !== e.speed &&
                      (this.options.speed !== e.speed ||
                        (t && this.options.speed)) &&
                      X(this, e.speed),
                    void 0 !== e.scaleToFit &&
                      (this.options.scaleToFit !== e.scaleToFit ||
                        (t && this.options.scaleToFit)) &&
                      ((this.options.scaleToFit = e.scaleToFit),
                      this.scaleClipHost()),
                    void 0 !== e.showVolume &&
                      this.options.showVolume !== e.showVolume &&
                      A(this, "showVolume"),
                    void 0 !== e.preview &&
                      this.options.preview !== e.preview &&
                      A(this, "showPreview"),
                    void 0 !== e.theme &&
                      this.options.theme !== e.theme &&
                      ((this.options.theme = e.theme), this.setTheme()),
                    (this.options = l(l({}, this.options), e));
                },
              },
              {
                key: "scaleClipHost",
                value: function () {
                  if (this.options.scaleToFit) {
                    var e = this.clip.props.containerParams.width,
                      t = this.clip.props.containerParams.height,
                      n = de(
                        { width: e, height: t },
                        {
                          width: this.clip.props.host.offsetWidth,
                          height: this.clip.props.host.offsetHeight,
                        },
                        "cover" === this.options.scaleToFit
                      );
                    (this.clip.realClip.rootElement.style.transform = "scale(".concat(
                      n.scale
                    )),
                      (this.clip.realClip.rootElement.style.left =
                        n.position.left + "px"),
                      (this.clip.realClip.rootElement.style.top =
                        n.position.top + "px");
                  } else
                    (this.clip.realClip.rootElement.style.transform =
                      "scale(1)"),
                      (this.clip.realClip.rootElement.style.left = "0px"),
                      (this.clip.realClip.rootElement.style.top = "0px");
                  this.eventBroadcast("scale-change", this.options.scaleToFit);
                },
              },
              {
                key: "createLoop",
                value: function (e, t) {
                  (this.settings.loopStartMillisecond = e),
                    (this.settings.loopEndMillisecond = t),
                    (this.elements.loopBar.style.left =
                      (e / this.clip.duration) * 100 + "%"),
                    (this.elements.loopBar.style.width =
                      ((t - e) / this.clip.duration) * 100 + "%"),
                    this.createJourney(e),
                    (this.elements.runningBar.style.width = "0%"),
                    !this.settings.loopActivated && Y(this);
                },
              },
              {
                key: "createJourney",
                value: function (e) {
                  var t = this,
                    n =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : {},
                    o = this.clip;
                  setTimeout(function () {
                    var s = n.before,
                      i = void 0 === s ? null : s,
                      a = n.after,
                      l = void 0 === a ? null : a;
                    i && o[i](),
                      (t.settings.journey = le.startJourney(o)),
                      t.settings.journey.station(e),
                      t.settings.journey.destination(),
                      l && o[l]();
                  }, 0);
                },
              },
              {
                key: "millisecondChange",
                value: function (e, t, n, o) {
                  var s =
                    !(arguments.length > 4 && void 0 !== arguments[4]) ||
                    arguments[4];
                  if (
                    (this.state !== t &&
                      ((this.state = t),
                      this.eventBroadcast("state-change", t)),
                    !this.settings.needsUpdate)
                  )
                    return this.clip.pause(), 1;
                  var i = this.settings,
                    a = i.loopActivated,
                    l = i.loopEndMillisecond,
                    r = i.loopStartMillisecond,
                    c = this.clip.duration,
                    p = this.elements,
                    d = p.totalBar,
                    u = p.loopBar,
                    m = u.offsetWidth,
                    h = u.offsetLeft / d.offsetWidth,
                    g = e - c * h,
                    v = (c / d.offsetWidth) * m;
                  return e >= l && a && this.clip.speed >= 0
                    ? (this.createJourney(r + 1, {
                        after:
                          this.settings.playAfterResize ||
                          "playing" == this.clip.runTimeInfo.state
                            ? "play"
                            : null,
                      }),
                      1)
                    : e >= l && a && this.clip.speed < 0
                    ? (this.createJourney(l - 1, {
                        after:
                          this.settings.playAfterResize ||
                          "playing" == this.clip.runTimeInfo.state
                            ? "play"
                            : null,
                      }),
                      1)
                    : e <= r && a && this.clip.speed >= 0
                    ? (this.createJourney(r + 1, {
                        after:
                          this.settings.playAfterResize ||
                          "playing" == this.clip.runTimeInfo.state
                            ? "play"
                            : null,
                      }),
                      1)
                    : e <= r && a && this.clip.speed < 0
                    ? (this.createJourney(l - 1, {
                        after:
                          this.settings.playAfterResize ||
                          "playing" == this.clip.runTimeInfo.state
                            ? "play"
                            : null,
                      }),
                      1)
                    : (o &&
                        this.createJourney(e, {
                          after: this.settings.playAfterResize ? "play" : null,
                        }),
                      (this.elements.runningBar.style.width =
                        (g / v) * 100 + "%"),
                      (this.elements.currentTime.innerHTML = this.timeFormat(
                        e
                      )),
                      void (
                        this.options.onMillisecondChange &&
                        s &&
                        this.options.onMillisecondChange(e)
                      ));
                },
              },
              {
                key: "eventBroadcast",
                value: function (e, t) {
                  var n = re("".concat(this.name, "-controls"));
                  "state-change" === e
                    ? (this.options.currentScript &&
                        (this.options.currentScript.dataset.status = t),
                      "paused" === t ||
                      "idle" === t ||
                      "transitional" === t ||
                      "armed" === t ||
                      "blocked" === t
                        ? (n.classList.value.includes("force-show-controls") ||
                            n.classList.toggle("force-show-controls"),
                          (this.elements.statusButton.innerHTML = v.playSVG),
                          this.elements.statusButton.appendChild(
                            this.elements.indicator
                          ),
                          (this.elements.indicator.innerHTML = "".concat(
                            t.charAt(0).toUpperCase() + t.slice(1)
                          )),
                          (this.elements.pointerEventPanel.innerHTML =
                            "blocked" === t
                              ? '\n            <div style="width:100%;height:100%;background:rgba(0,0,0,0.5);display:flex;justify-content:center;align-items:center;">'.concat(
                                  v.loadingSVG,
                                  "</div>"
                                )
                              : ""))
                        : (n.classList.value.includes("force-show-controls") &&
                            n.classList.toggle("force-show-controls"),
                          (this.elements.statusButton.innerHTML = v.pauseSVG),
                          this.elements.statusButton.appendChild(
                            this.elements.indicator
                          ),
                          (this.elements.indicator.innerHTML = "Playing"),
                          (this.elements.pointerEventPanel.innerHTML = ""),
                          "playing" === t &&
                          this.clip.runTimeInfo.currentMillisecond ===
                            this.clip.duration &&
                          this.clip.speed >= 0
                            ? this.createJourney(1, { after: "play" })
                            : (("playing" === t &&
                                0 ===
                                  this.clip.runTimeInfo.currentMillisecond &&
                                this.clip.speed < 0) ||
                                ("playing" === t &&
                                  this.clip.runTimeInfo.currentMillisecond ===
                                    this.clip.duration &&
                                  this.clip.speed < 0)) &&
                              this.createJourney(this.clip.duration - 1, {
                                after: "play",
                              })))
                    : "duration-change" === e
                    ? ((this.elements.totalTime.innerHTML = this.timeFormat(
                        this.clip.duration
                      )),
                      (this.settings.loopEndMillisecond = this.clip.duration),
                      (this.elements.pointerEventPanel.innerHTML = ""),
                      this.millisecondChange(
                        this.clip.runTimeInfo.currentMillisecond
                      ))
                    : this.options.currentScript &&
                      ("volume-change" === e
                        ? ((this.options.volume = t),
                          (this.options.currentScript.dataset.volume = t))
                        : "speed-change" === e
                        ? ((this.options.speed = t),
                          (this.options.currentScript.dataset.speed = t))
                        : "mute-change" === e
                        ? t
                          ? ((this.options.muted = !0),
                            (this.options.currentScript.dataset.muted = ""))
                          : ((this.options.muted = !1),
                            delete this.options.currentScript.dataset.muted)
                        : "loop-change" === e
                        ? t
                          ? ((this.options.loop = !0),
                            (this.options.currentScript.dataset.loop = ""))
                          : ((this.options.loop = !1),
                            delete this.options.currentScript.dataset.loop)
                        : "scale-change" === e
                        ? t
                          ? ((this.options.scaleToFit = !0),
                            (this.options.currentScript.dataset.scaleToFit =
                              ""))
                          : ((this.options.scaleToFit = !1),
                            delete this.options.currentScript.dataset
                              .scaleToFit)
                        : "show-volume-change" === e
                        ? t
                          ? ((this.options.showVolume = !0),
                            (this.options.currentScript.dataset.showVolume =
                              ""))
                          : ((this.options.showVolume = !1),
                            delete this.options.currentScript.dataset
                              .showVolume)
                        : "show-preview-change" === e &&
                          (t
                            ? ((this.options.preview = !0),
                              (this.options.currentScript.dataset.preview = ""))
                            : ((this.options.preview = !1),
                              delete this.options.currentScript.dataset
                                .preview)));
                },
              },
              {
                key: "subscribeToDurationChange",
                value: function () {
                  this.clip.subscribeToDurationChange(
                    this.subscribeToDurationChangeCallback.bind(this)
                  );
                },
              },
              {
                key: "subscribeToDurationChangeCallback",
                value: function () {
                  this.eventBroadcast("duration-change");
                },
              },
              {
                key: "subscribeToTimer",
                value: function () {
                  this.clip.subscribe(
                    this.id,
                    this.millisecondChange.bind(this)
                  );
                },
              },
              {
                key: "handleDragStart",
                value: function () {
                  (this.settings.needsUpdate = !0),
                    (this.settings.journey = le.startJourney(this.clip));
                },
              },
              {
                key: "timeFormat",
                value: function (e) {
                  if ("ss" === this.options.timeFormat) {
                    var t = e / 1e3 / 60 / 60,
                      n = (t % 1) * 60,
                      o = (n % 1) * 60,
                      s = ("0" + parseInt(t)).slice(-2),
                      i = ("0" + parseInt(n)).slice(-2),
                      a = ("0" + parseInt(o)).slice(-2);
                    return ""
                      .concat("00" === s ? "" : s + ":")
                      .concat(i, ":")
                      .concat(a);
                  }
                  return e;
                },
              },
              {
                key: "handleDrag",
                value: function (e) {
                  var t =
                    !(arguments.length > 1 && void 0 !== arguments[1]) ||
                    arguments[1];
                  isFinite(e) || (e = 0);
                  var n = this.clip.duration,
                    o = this.settings.journey,
                    s = this.elements,
                    i = s.loopBar,
                    a = s.totalBar,
                    l = s.runningBar,
                    r = s.currentTime,
                    c = e + i.offsetLeft,
                    p = Math.round((n * c) / a.offsetWidth);
                  (r.innerHTML = this.timeFormat(p)),
                    (l.style.width = (e / i.offsetWidth) * 100 + "%"),
                    o.station(p),
                    this.options.onMillisecondChange &&
                      t &&
                      this.options.onMillisecondChange(p);
                },
              },
              {
                key: "handleDragEnd",
                value: function () {
                  this.settings.journey.destination();
                },
              },
              {
                key: "createProgressDrag",
                value: function (e) {
                  this.handleDragStart(),
                    this.handleDrag(e),
                    this.handleDragEnd();
                },
              },
              {
                key: "addEventListeners",
                value: function () {
                  var e;
                  ((e = this).listeners.onCursorMoveLoopEnd = function (t) {
                    t.preventDefault();
                    var n =
                      (t.clientX || ((t.touches || [])[0] || {}).clientX) -
                      e.elements.totalBar.getBoundingClientRect().left;
                    n < 0
                      ? (n = 0)
                      : n > e.elements.totalBar.offsetWidth &&
                        (n = e.elements.totalBar.offsetWidth),
                      e.elements.runningBar.offsetWidth >=
                        e.elements.loopBar.offsetWidth &&
                        (e.elements.runningBar.style.width =
                          e.elements.loopBar.offsetWidth + "px"),
                      e.settings.loopLastPositionXPxls - n < 0
                        ? (e.elements.loopBar.style.width =
                            Math.abs(e.settings.loopLastPositionXPxls - n) +
                            "px")
                        : ((e.elements.loopBar.style.left = n + "px"),
                          (e.settings.loopLastPositionXPxls = n)),
                      (e.settings.loopEndMillisecond = Math.round(
                        (e.clip.duration *
                          ((parseFloat(e.elements.loopBar.style.left) || 0) +
                            parseFloat(e.elements.loopBar.style.width))) /
                          e.elements.totalBar.offsetWidth
                      )),
                      e.settings.loopEndMillisecond <
                        e.clip.runTimeInfo.currentMillisecond &&
                        (e.settings.loopJourney = !0),
                      e.settings.loopStartMillisecond >
                        e.settings.loopEndMillisecond &&
                        ((e.settings.loopStartMillisecond =
                          e.settings.loopEndMillisecond),
                        (e.settings.loopJourney = !0)),
                      (e.elements.loopEndTime.innerHTML =
                        e.settings.loopEndMillisecond),
                      (e.elements.loopStartTime.innerHTML =
                        e.settings.loopStartMillisecond);
                  }),
                    (e.listeners.onMouseUpLoopEnd = function (t) {
                      if (
                        ((e.elements.listenerHelper.style.pointerEvents =
                          "none"),
                        (e.settings.resizeLoop = !1),
                        t.preventDefault(),
                        (e.elements.runningBar.style.width =
                          (e.elements.runningBar.offsetWidth /
                            e.elements.loopBar.offsetWidth) *
                            100 +
                          "%"),
                        (e.elements.loopBar.style.left =
                          (e.elements.loopBar.offsetLeft /
                            e.elements.totalBar.offsetWidth) *
                            100 +
                          "%"),
                        (e.elements.loopBar.style.width =
                          (e.elements.loopBar.offsetWidth /
                            e.elements.totalBar.offsetWidth) *
                            100 +
                          "%"),
                        e.settings.loopJourney &&
                          (e.createProgressDrag(
                            e.elements.runningBar.offsetWidth
                          ),
                          (e.settings.loopJourney = !1)),
                        C("mouseup", e.listeners.onMouseUpLoopEnd, !1),
                        C("touchend", e.listeners.onMouseUpLoopEnd, !1),
                        C("mousemove", e.listeners.onCursorMoveLoopEnd, !1),
                        C("touchmove", e.listeners.onCursorMoveLoopEnd, !1),
                        e.elements.loopBar.addEventListener(
                          "mousedown",
                          e.listeners.onMouseDown,
                          !1
                        ),
                        e.elements.loopBar.addEventListener(
                          "touchstart",
                          e.listeners.onMouseDown,
                          { passive: !0 },
                          !1
                        ),
                        e.settings.playAfterResize)
                      ) {
                        var n;
                        if ("idle" === e.clip.runTimeInfo.state)
                          (n =
                            e.clip.speed >= 0
                              ? e.settings.loopStartMillisecond + 1
                              : e.settings.loopEndMillisecond - 1),
                            (e.settings.needsUpdate = !0),
                            e.createJourney(n, {
                              before: "pause",
                              after: "play",
                            });
                        else if ("completed" === e.clip.runTimeInfo.state) {
                          var o;
                          (o =
                            e.clip.speed >= 0
                              ? e.settings.loopStartMillisecond + 1
                              : e.settings.loopEndMillisecond - 1),
                            (e.settings.needsUpdate = !0),
                            e.createJourney(o, {
                              before: "pause",
                              after: "play",
                            });
                        } else e.clip.play();
                        e.settings.playAfterResize = !1;
                      }
                    }),
                    (e.listeners.onMouseDownLoopEnd = function (t) {
                      (e.elements.listenerHelper.style.pointerEvents = "auto"),
                        (e.settings.resizeLoop = !0),
                        (e.settings.needsUpdate = !0),
                        "playing" === e.clip.runTimeInfo.state &&
                          (e.clip.pause(), (e.settings.playAfterResize = !0)),
                        t.preventDefault(),
                        (e.elements.runningBar.style.width =
                          e.elements.runningBar.offsetWidth + "px"),
                        (e.elements.loopBar.style.left =
                          e.elements.loopBar.offsetLeft + "px"),
                        (e.elements.loopBar.style.width =
                          e.elements.loopBar.offsetWidth + "px"),
                        e.elements.loopBar.removeEventListener(
                          "mousedown",
                          e.listeners.onMouseDown,
                          !1
                        ),
                        e.elements.loopBar.removeEventListener(
                          "touchstart",
                          e.listeners.onMouseDown,
                          !1
                        ),
                        e.listeners.onCursorMoveLoopEnd(t),
                        S("mouseup", e.listeners.onMouseUpLoopEnd, !1),
                        S("touchend", e.listeners.onMouseUpLoopEnd, !1),
                        S("mousemove", e.listeners.onCursorMoveLoopEnd, !1),
                        S("touchmove", e.listeners.onCursorMoveLoopEnd, !1);
                    }),
                    e.elements.loopBarEnd.addEventListener(
                      "mousedown",
                      e.listeners.onMouseDownLoopEnd,
                      !1
                    ),
                    e.elements.loopBarEnd.addEventListener(
                      "touchstart",
                      e.listeners.onMouseDownLoopEnd,
                      { passive: !1 },
                      !1
                    ),
                    (function (e) {
                      (e.listeners.onCursorMove = function (t) {
                        t.preventDefault();
                        var n =
                          (t.clientX || ((t.touches || [])[0] || {}).clientX) -
                          e.elements.loopBar.getBoundingClientRect().left;
                        n < 0
                          ? (n = 0)
                          : n > e.elements.loopBar.offsetWidth &&
                            (n = e.elements.loopBar.offsetWidth),
                          e.handleDrag(n);
                      }),
                        (e.listeners.onMouseUp = function () {
                          (e.elements.listenerHelper.style.pointerEvents =
                            "none"),
                            P("mouseup", e.listeners.onMouseUp, !1),
                            P("touchend", e.listeners.onMouseUp, !1),
                            P("mousemove", e.listeners.onCursorMove, !1),
                            P("touchmove", e.listeners.onCursorMove, !1),
                            e.handleDragEnd(e.settings);
                        }),
                        (e.listeners.onMouseDown = function (t) {
                          (e.elements.listenerHelper.style.pointerEvents =
                            "auto"),
                            "playing" === e.clip.runTimeInfo.state &&
                              (e.settings.playAfterResize = !0),
                            e.handleDragStart(e.clip),
                            e.listeners.onCursorMove(t),
                            V("mouseup", e.listeners.onMouseUp, !1),
                            V("touchend", e.listeners.onMouseUp, !1),
                            V("mousemove", e.listeners.onCursorMove, !1),
                            V("touchmove", e.listeners.onCursorMove, !1);
                        }),
                        e.elements.loopBar.addEventListener(
                          "mousedown",
                          e.listeners.onMouseDown,
                          !1
                        ),
                        e.elements.loopBar.addEventListener(
                          "touchstart",
                          e.listeners.onMouseDown,
                          { passive: !1 },
                          !1
                        );
                    })(this),
                    (function (e) {
                      (e.listeners.onCursorMoveLoopStart = function (t) {
                        t.preventDefault();
                        var n =
                            t.clientX || ((t.touches || [])[0] || {}).clientX,
                          o = e.elements.totalBar.getBoundingClientRect(),
                          s = Math.round(n - o.left),
                          i = Math.round(
                            (e.settings.loopEndMillisecond / e.clip.duration) *
                              e.elements.totalBar.offsetWidth
                          );
                        s < 0
                          ? (s = 0)
                          : s > e.elements.totalBar.offsetWidth &&
                            (s = e.elements.totalBar.offsetWidth);
                        var a =
                          (e.clip.runTimeInfo.currentMillisecond /
                            e.clip.duration) *
                            e.elements.totalBar.offsetWidth -
                          s;
                        (e.elements.loopBar.style.left = s + "px"),
                          (e.elements.loopBar.style.width = i - s + "px"),
                          (e.elements.runningBar.style.width = a + "px"),
                          (e.settings.loopLastPositionXPxls = s),
                          (e.settings.loopStartMillisecond = Math.round(
                            (e.clip.duration * e.elements.loopBar.offsetLeft) /
                              e.elements.totalBar.offsetWidth
                          )),
                          e.settings.loopEndMillisecond <
                            e.settings.loopStartMillisecond &&
                            ((e.settings.loopEndMillisecond =
                              e.settings.loopStartMillisecond),
                            (e.elements.loopBar.style.width = "0px"),
                            (e.elements.runningBar.style.width = "0px")),
                          (e.elements.loopEndTime.innerHTML =
                            e.settings.loopEndMillisecond),
                          (e.elements.loopStartTime.innerHTML =
                            e.settings.loopStartMillisecond),
                          e.settings.loopStartMillisecond >
                            e.clip.runTimeInfo.currentMillisecond &&
                            (e.settings.loopJourney = !0);
                      }),
                        (e.listeners.onMouseUpLoopStart = function (t) {
                          var n;
                          (e.elements.listenerHelper.style.pointerEvents =
                            "none"),
                            (e.settings.resizeLoop = !1),
                            t.preventDefault(),
                            e.settings.loopJourney &&
                              (e.createProgressDrag(
                                e.elements.runningBar.offsetWidth
                              ),
                              (e.settings.loopJourney = !1)),
                            (e.elements.loopBar.style.left =
                              (e.elements.loopBar.offsetLeft /
                                e.elements.totalBar.offsetWidth) *
                                100 +
                              "%"),
                            (e.elements.loopBar.style.width =
                              (e.elements.loopBar.offsetWidth /
                                e.elements.totalBar.offsetWidth) *
                                100 +
                              "%"),
                            (e.settings.loopStartMillisecond = Math.round(
                              (e.clip.duration *
                                e.elements.loopBar.offsetLeft) /
                                e.elements.totalBar.offsetWidth
                            )),
                            (e.elements.runningBar.style.width =
                              (e.elements.runningBar.offsetWidth /
                                e.elements.loopBar.offsetWidth) *
                                100 +
                              "%"),
                            T("mouseup", e.listeners.onMouseUpLoopStart, !1),
                            T("touchend", e.listeners.onMouseUpLoopStart, !1),
                            T(
                              "mousemove",
                              e.listeners.onCursorMoveLoopStart,
                              !1
                            ),
                            T(
                              "touchmove",
                              e.listeners.onCursorMoveLoopStart,
                              !1
                            ),
                            e.elements.loopBar.addEventListener(
                              "mousedown",
                              e.listeners.onMouseDown,
                              !1
                            ),
                            e.elements.loopBar.addEventListener(
                              "touchstart",
                              e.listeners.onMouseDown,
                              { passive: !0 },
                              !1
                            ),
                            e.settings.playAfterResize &&
                              ("idle" === e.clip.runTimeInfo.state
                                ? ((n =
                                    e.clip.speed >= 0
                                      ? e.settings.loopStartMillisecond + 1
                                      : e.settings.loopEndMillisecond - 1),
                                  (e.settings.needsUpdate = !0),
                                  e.createJourney(n, {
                                    before: "pause",
                                    after: "play",
                                  }))
                                : e.clip.play(),
                              (e.settings.playAfterResize = !1));
                        }),
                        (e.listeners.onMouseDownLoopStart = function (t) {
                          (e.elements.listenerHelper.style.pointerEvents =
                            "auto"),
                            (e.settings.resizeLoop = !0),
                            t.preventDefault(),
                            (e.settings.needsUpdate = !0),
                            "playing" === e.clip.runTimeInfo.state &&
                              (e.clip.pause(),
                              (e.settings.playAfterResize = !0)),
                            e.elements.loopBar.removeEventListener(
                              "mousedown",
                              e.listeners.onMouseDown,
                              !1
                            ),
                            e.elements.loopBar.removeEventListener(
                              "touchstart",
                              e.listeners.onMouseDown,
                              !1
                            ),
                            e.listeners.onCursorMoveLoopStart(t),
                            E("mouseup", e.listeners.onMouseUpLoopStart, !1),
                            E("touchend", e.listeners.onMouseUpLoopStart, !1),
                            E(
                              "mousemove",
                              e.listeners.onCursorMoveLoopStart,
                              !1
                            ),
                            E(
                              "touchmove",
                              e.listeners.onCursorMoveLoopStart,
                              !1
                            );
                        }),
                        e.elements.loopBarStart.addEventListener(
                          "mousedown",
                          e.listeners.onMouseDownLoopStart,
                          !1
                        ),
                        e.elements.loopBarStart.addEventListener(
                          "touchstart",
                          e.listeners.onMouseDownLoopStart,
                          { passive: !1 },
                          !1
                        );
                    })(this),
                    (function (e) {
                      (e.listeners.editableLoopStartTime = function () {
                        (e.elements.editableLoopStartTime.value =
                          e.elements.loopStartTime.innerHTML),
                          e.elements.loopStartTime.replaceWith(
                            e.elements.editableLoopStartTime
                          ),
                          e.elements.editableLoopStartTime.focus();
                      }),
                        (e.listeners.editableLoopEndTime = function () {
                          (e.elements.editableLoopEndTime.value =
                            e.elements.loopEndTime.innerHTML),
                            e.elements.loopEndTime.replaceWith(
                              e.elements.editableLoopEndTime
                            ),
                            e.elements.editableLoopEndTime.focus();
                        }),
                        (e.elements.editableLoopEndTime.onkeydown = e.elements.editableLoopStartTime.onkeydown = function (
                          t
                        ) {
                          t.preventDefault(),
                            13 === t.keyCode &&
                              (e.elements.editableLoopStartTime.onfocusout(),
                              e.elements.editableLoopEndTime.onfocusout()),
                            8 === t.keyCode &&
                              (t.target.value = t.target.value
                                .toString()
                                .substring(
                                  0,
                                  t.target.value.toString().length - 1
                                )),
                            13 === t.keyCode && t.target.blur();
                          var n = parseFloat(
                            (t.target.value || 0).toString() + t.key
                          );
                          if (!(n > e.clip.duration))
                            if (
                              ((t.target.value = n),
                              t.target === e.elements.editableLoopStartTime)
                            ) {
                              var o = e.elements.totalBar.getBoundingClientRect(),
                                s = {
                                  preventDefault: function () {},
                                  clientX:
                                    (e.elements.totalBar.offsetWidth /
                                      e.clip.duration) *
                                      t.target.value +
                                    o.left,
                                };
                              e.listeners.onMouseDownLoopStart(s),
                                e.listeners.onCursorMoveLoopStart(s),
                                e.listeners.onMouseUpLoopStart(s);
                            } else if (
                              t.target === e.elements.editableLoopEndTime
                            ) {
                              var i = e.elements.totalBar.getBoundingClientRect(),
                                a = {
                                  preventDefault: function () {},
                                  clientX:
                                    (e.elements.totalBar.offsetWidth /
                                      e.clip.duration) *
                                      t.target.value +
                                    i.left,
                                };
                              e.listeners.onMouseDownLoopEnd(a),
                                e.listeners.onCursorMoveLoopEnd(a),
                                e.listeners.onMouseUpLoopEnd(a);
                            }
                        }),
                        (e.elements.loopStartTime.onclick =
                          e.listeners.editableLoopStartTime),
                        (e.elements.loopEndTime.onclick =
                          e.listeners.editableLoopEndTime),
                        (e.elements.editableLoopStartTime.onfocusout = function () {
                          e.elements.editableLoopStartTime.replaceWith(
                            e.elements.loopStartTime
                          );
                        }),
                        (e.elements.editableLoopEndTime.onfocusout = function () {
                          e.elements.editableLoopEndTime.replaceWith(
                            e.elements.loopEndTime
                          );
                        });
                    })(this),
                    M(this),
                    (function (e) {
                      e.elements.statusButton.onclick = function (t) {
                        return (
                          t.preventDefault(),
                          "playing" === e.clip.runTimeInfo.state
                            ? e.clip.pause()
                            : ("paused" !== e.clip.runTimeInfo.state &&
                                "idle" !== e.clip.runTimeInfo.state &&
                                "transitional" !== e.clip.runTimeInfo.state &&
                                "armed" !== e.clip.runTimeInfo.state) ||
                              e.clip.play(),
                          !1
                        );
                      };
                    })(this),
                    O(this),
                    j(this),
                    _(this),
                    (function (e) {
                      (K(
                        "".concat(e.name, "-controls")
                      ).onmouseover = function () {
                        e.settings.loopActivated &&
                          (e.elements.loopBarStart.classList.remove(
                            "m-fadeOut"
                          ),
                          e.elements.loopBarEnd.classList.remove("m-fadeOut"),
                          e.elements.loopBarStart.classList.add("m-fadeIn"),
                          e.elements.loopBarEnd.classList.add("m-fadeIn"));
                      }),
                        (K(
                          "".concat(e.name, "-controls")
                        ).onmouseout = function (t) {
                          var n = t.toElement || t.relatedTarget || t.target;
                          Q(this, n) ||
                            n === this ||
                            (e.settings.loopActivated &&
                              (e.elements.loopBarStart.classList.add(
                                "m-fadeOut"
                              ),
                              e.elements.loopBarEnd.classList.add("m-fadeOut"),
                              e.elements.loopBarStart.classList.remove(
                                "m-fadeIn"
                              ),
                              e.elements.loopBarEnd.classList.remove(
                                "m-fadeIn"
                              )));
                        });
                      var t = !1;
                      (K(
                        "".concat(e.name, "-controls")
                      ).ontouchstart = function (n) {
                        var o = n.toElement || n.relatedTarget || n.target;
                        Q(e.elements.statusButton, o) ||
                          o === e.elements.statusButton ||
                          Q(e.elements.settingsButton, o) ||
                          o === e.elements.settingsButton ||
                          Q(e.elements.fullScreenButton, o) ||
                          o === e.elements.fullScreenButton ||
                          Q(e.elements.loopButton, o) ||
                          o === e.elements.loopButton ||
                          Q(e.elements.totalBar, o) ||
                          o === e.elements.totalBar ||
                          (e.elements.settings.showVolume &&
                            ((e.elements.volumeControl.className = "".concat(
                              e.name,
                              "-volume-width-transition"
                            )),
                            (e.elements.volumeBar.className = "".concat(
                              e.name,
                              "-volume-width-transition"
                            )),
                            (e.elements.volumeBarHelper.className = "".concat(
                              e.name,
                              "-volume-width-transition"
                            ))),
                          (e.elements.timeDisplay.className = "".concat(
                            e.name,
                            "-time-width-transition"
                          )),
                          (e.elements.volumeCursor.className = "".concat(
                            e.name,
                            "-volume-cursor-transition"
                          )),
                          (t = !0));
                      }),
                        window.addEventListener("touchstart", function (n) {
                          var o = n.toElement || n.relatedTarget || n.target;
                          Q(K("".concat(e.name, "-controls")), o) ||
                            o === K("".concat(e.name, "-controls")) ||
                            (t &&
                              ((e.elements.volumeControl.className = ""),
                              (e.elements.volumeBar.className = ""),
                              (e.elements.volumeBarHelper.className = ""),
                              (e.elements.timeDisplay.className = ""),
                              (e.elements.volumeCursor.className = "")));
                        });
                    })(this),
                    ee(this),
                    (function (e) {
                      e.elements.donkeyclipButton.addEventListener(
                        "click",
                        function () {
                          var t = te(),
                            n = window.open(
                              "https://donkeyclip.com?u=".concat(t)
                            ),
                            o = e.clip.exportDefinition(),
                            s = e.clipClass;
                          window.addEventListener(
                            "message",
                            function (e) {
                              e.data === t &&
                                n.postMessage(
                                  JSON.stringify({
                                    definition: o,
                                    clipClass: s,
                                    u: t,
                                  }),
                                  "*"
                                );
                            },
                            !1
                          );
                        }
                      );
                    })(this),
                    (function (e) {
                      if (
                        !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                          navigator.userAgent
                        )
                      ) {
                        var t = function () {
                            e.options.preview &&
                              (ne(
                                "".concat(e.name, "-hover-display")
                              ).classList.toggle("m-fadeIn"),
                              ne(
                                "".concat(e.name, "-hover-display")
                              ).classList.toggle("m-fadeOut"),
                              (e.elements.loopBar.onmousemove = o));
                          },
                          n = function n() {
                            e.options.preview &&
                              (t(),
                              (e.elements.loopBar.onmouseover = e.elements.loopBar.onmouseout = t),
                              (e.elements.loopBar.onmousemove = o),
                              se("mouseup", n, !1),
                              se("touchend", n, !1),
                              se("mousemove", o, !1),
                              se("touchmove", o, !1));
                          };
                        (e.elements.loopBar.onmouseover = e.elements.loopBar.onmouseout = t),
                          (e.elements.loopBar.onmousedown = function () {
                            e.options.preview &&
                              ((e.elements.loopBar.onmouseover = e.elements.loopBar.onmouseout = null),
                              (e.elements.loopBar.onmousemove = null),
                              oe("mouseup", n, !1),
                              oe("touchend", n, !1),
                              oe("mousemove", o, !1),
                              oe("touchmove", o, !1));
                          }),
                          (e.elements.loopBar.onmouseup = function () {
                            e.options.preview &&
                              (se("mouseup", n, !1),
                              se("touchend", n, !1),
                              se("mousemove", o, !1),
                              se("touchmove", o, !1),
                              (e.elements.loopBar.onmouseover = e.elements.loopBar.onmouseout = t),
                              (e.elements.loopBar.onmousemove = o));
                          });
                        var o = function (t) {
                          var n = t.clientX,
                            o = e.elements.loopBar.getBoundingClientRect();
                          if (
                            n - o.left + e.settings.loopLastPositionXPxls >
                              e.settings.loopLastPositionXPxls +
                                e.elements.loopBar.offsetWidth &&
                            !e.settings.resizeLoop
                          )
                            ne(
                              "".concat(e.name, "-hover-millisecond")
                            ).innerHTML = e.timeFormat(
                              e.settings.loopEndMillisecond
                            );
                          else if (n - o.left < 0 && !e.settings.resizeLoop)
                            ne(
                              "".concat(e.name, "-hover-millisecond")
                            ).innerHTML = e.timeFormat(
                              e.settings.loopStartMillisecond
                            );
                          else {
                            var s =
                              n - o.left + e.settings.loopLastPositionXPxls;
                            s < 0 && (s = 0);
                            var i =
                                ne("".concat(e.name, "-hover-display"))
                                  .offsetWidth / 2,
                              a =
                                ne("".concat(e.name, "-hover-display"))
                                  .offsetWidth / 2,
                              l = s - a;
                            s - i < 0
                              ? (l = 0)
                              : s + i > e.elements.totalBar.offsetWidth &&
                                (l = e.elements.totalBar.offsetWidth - a - i);
                            var r = Math.round(
                              (s / e.elements.totalBar.offsetWidth) *
                                e.clip.duration
                            );
                            if (e.options.preview) {
                              var c = r / e.clip.duration;
                              e.previewClip.onProgress(c, r);
                            }
                            (ne(
                              "".concat(e.name, "-hover-millisecond")
                            ).innerHTML = e.timeFormat(r)),
                              (ne(
                                "".concat(e.name, "-hover-display")
                              ).style.left = l + "px");
                          }
                        };
                      }
                    })(this),
                    (function (e) {
                      document.addEventListener(
                        "fullscreenchange",
                        function () {
                          e.elements.mcPlayer.classList.toggle("full-screen"),
                            e.clip.props.host.classList.toggle("full-screen"),
                            e.options.preview && e.setPreviewDimentions();
                        }
                      ),
                        document.addEventListener(
                          "webkitfullscreenchange",
                          function () {
                            e.elements.mcPlayer.classList.toggle("full-screen"),
                              e.clip.props.host.classList.toggle("full-screen"),
                              e.options.preview && e.setPreviewDimentions();
                          }
                        ),
                        document.addEventListener(
                          "mozfullscreenchange",
                          function () {
                            e.elements.mcPlayer.classList.toggle("full-screen"),
                              e.clip.props.host.classList.toggle("full-screen"),
                              e.options.preview && e.setPreviewDimentions();
                          }
                        ),
                        document.addEventListener(
                          "MSFullscreenChange",
                          function () {
                            e.elements.mcPlayer.classList.toggle("full-screen"),
                              e.clip.props.host.classList.toggle("full-screen"),
                              e.options.preview && e.setPreviewDimentions();
                          }
                        ),
                        ie("body")[0].addEventListener("click", function (t) {
                          if (
                            t.target.className ===
                            "".concat(e.name, "-speed-value")
                          ) {
                            var n = t.target.dataset.speedValue - 0;
                            (e.clip.executionSpeed =
                              t.target.dataset.speedValue),
                              (n = 1 == e.clip.speed ? "Normal" : e.clip.speed),
                              (e.elements.speedCurrent.innerHTML = n);
                            var o = 1 / (e.options.speedValues.length - 1),
                              s =
                                -1 *
                                (t.target.dataset.zone * o - 1) *
                                (16 * (e.options.speedValues.length - 1));
                            ae("".concat(e.name, "-speed-cursor")).style.top =
                              s + "px";
                          }
                        });
                    })(this);
                },
              },
              {
                key: "launchIntoFullscreen",
                value: function (e) {
                  this.options.preview && this.setPreviewDimentions(),
                    e.requestFullscreen
                      ? e.requestFullscreen()
                      : e.mozRequestFullScreen
                      ? e.mozRequestFullScreen()
                      : e.webkitRequestFullscreen
                      ? e.webkitRequestFullscreen()
                      : e.msRequestFullscreen && e.msRequestFullscreen();
                },
              },
              {
                key: "exitFullscreen",
                value: function () {
                  document.exitFullscreen
                    ? document.exitFullscreen()
                    : document.mozCancelFullScreen
                    ? document.mozCancelFullScreen()
                    : document.webkitExitFullscreen &&
                      document.webkitExitFullscreen();
                },
              },
              {
                key: "setTheme",
                value: function () {
                  re(this.name + "-style") &&
                    ce("head")[0].removeChild(re(this.name + "-style")),
                    this.options.theme.replace(/\s\s+/g, " "),
                    this.options.theme.trim(),
                    this.options.theme.includes("on-top") ||
                      this.options.theme.includes("position-bottom") ||
                      (this.options.theme += " on-top");
                  var e = {};
                  for (var t in this.options.theme.split(" ")) {
                    var n = b(this.options.theme.split(" ")[t], this.name);
                    for (var o in n || {}) e[o] = n[o];
                  }
                  var s = (function (e, t, n) {
                      return "\n#"
                        .concat(t, ", #")
                        .concat(
                          t,
                          " *{\n  font-family:'Ubuntu' !important;\n}\n#"
                        )
                        .concat(t, " .background {\n  background-color: ")
                        .concat(
                          n.backgroundColor,
                          ";\n  width:100%;\n  height:"
                        )
                        .concat(
                          e["background-height"],
                          ";;\n  position:absolute;\n  top:0px;\n  left:0px;\n  z-index:-2000;\n}\n\n#"
                        )
                        .concat(t, " .full-screen #")
                        .concat(
                          t,
                          "-controls {\n  position:fixed;\n  left:0px;\n  bottom:0px;\n}\n\n#"
                        )
                        .concat(t, " .full-screen #")
                        .concat(
                          t,
                          "-settings-panel {\n  position:fixed;\n  bottom: 45px;\n}\n\n#"
                        )
                        .concat(t, " .svg,#")
                        .concat(t, " .svg *,#")
                        .concat(t, " svg,#")
                        .concat(t, " svg *  {\n  fill: ")
                        .concat(e["svg-color"], ";\n}\n\n#")
                        .concat(t, " .svg.arrow * {\n  stroke: ")
                        .concat(
                          e["svg-color"],
                          ";\n  fill: transparent;\n}\n\n#"
                        )
                        .concat(t, " .pointer-event-panel {\n  height: ")
                        .concat(
                          e["pointer-event-panel-height"],
                          ";\n  display:flex;\n  align-items:center;\n  justify-content:center;\n}\n#"
                        )
                        .concat(
                          t,
                          "-pointer-event-panel{\n  width:100%;\n  position:absolute;\n  z-index:100;\n}\n#"
                        )
                        .concat(
                          t,
                          "-listener-helper{\n  width:100%;\n  height:calc( 100% - 45px );\n  position:absolute;\n  z-index:110;\n}\n#"
                        )
                        .concat(t, " .svg-selected svg{\n  fill: ")
                        .concat(e["svg-selected-color"], ";\n  stroke: ")
                        .concat(e["svg-selected-color"], ";\n}\n#")
                        .concat(
                          t,
                          "-hover-display{\n  display: flex;\n  visibility:hidden;\n  opacity:0;\n  background-color: black;\n  position: absolute;\n  bottom: 30px;\n  left: 0px;\n  align-items: flex-end;\n  justify-content: center;\n}\n#"
                        )
                        .concat(
                          t,
                          "-hover-display-clip{\n  width:100%;\n  height:100%;\n  overflow:hidden;\n  position:relative;\n}\n#"
                        )
                        .concat(t, "-hover-display-border{\n  border: ")
                        .concat(
                          e["preview-border"],
                          ";\n  position:absolute;\n  width:calc(100% - 4px);\n  height:calc(100% - 4px);\n  z-index:2;\n}\n\n#"
                        )
                        .concat(
                          t,
                          "-hover-millisecond {\n  font-weight:bold;\n  padding:3px;\n  height:18px;\n  margin:0px;\n  line-height:12px;\n  font-size:10px;\n  text-align: center;\n  min-width:20px;\n  max-width:100px;\n  z-index:2;\n  position:absolute;\n  bottom:-25px;\n}\n#"
                        )
                        .concat(t, ",\n#")
                        .concat(t, " ::before,\n#")
                        .concat(t, " :::after,\n#")
                        .concat(t, " div,\n#")
                        .concat(t, " p,\n#")
                        .concat(t, " span,\n#")
                        .concat(t, " ul,\n#")
                        .concat(
                          t,
                          " li {\n  font-weight: 400;\n  line-height: 1.9 !important;\n  color: "
                        )
                        .concat(
                          e.color,
                          ';\n  font-family: "Century Gothic", CenturyGothic, AppleGothic, sans-serif;\n  box-sizing:border-box;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n#'
                        )
                        .concat(
                          t,
                          " {\n  line-height: 1.9;\n  font-size: 12px;\n  overflow:hidden;\n  height: calc(100% + "
                        )
                        .concat(
                          e["controls-position"],
                          ");\n  width:100%;\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  color: "
                        )
                        .concat(e.color, ";\n  pointer-events:auto;\n}\n\n#")
                        .concat(
                          t,
                          " .force-show-controls {\n  opacity:1 !important;\n}\n\n"
                        )
                        .concat(
                          n.theme.includes("position-bottom")
                            ? "\n    #".concat(
                                t,
                                "-controls {\n      opacity:1 !important;\n    }\n    "
                              )
                            : "#"
                                .concat(t, ":hover #")
                                .concat(
                                  t,
                                  "-controls {\n  opacity:1 !important;\n}\n"
                                ),
                          "\n\n#"
                        )
                        .concat(t, ":hover {\n  pointer-events:none;\n}\n\n#")
                        .concat(
                          t,
                          "-settings-speed-hide {\n  text-align:right;\n}\n\n#"
                        )
                        .concat(
                          t,
                          " .grad {\n  pointer-events:none !important;\n  background-image: linear-gradient(\n    rgba(0,0,0,00.001),\n    rgba(0,0,0,00.004),\n    rgba(0,0,0,00.007),\n    rgba(0,0,0,00.01),\n    rgba(0,0,0,0.04),\n    rgba(0,0,0,0.07),\n    rgba(0,0,0,0.1),\n    rgba(0,0,0,0.15),\n    rgba(0,0,0,0.2),\n    rgba(0,0,0,0.25),\n    rgba(0,0,0,0.3),\n    rgba(0,0,0,0.35),\n    rgba(0,0,0,0.4),\n    rgba(0,0,0,0.45),\n    rgba(0,0,0,0.5),\n    rgba(0,0,0,0.55),\n    rgba(0,0,0,0.6),\n    rgba(0,0,0,0.65),\n    rgba(0,0,0,0.7),\n    rgba(0,0,0,0.75),\n    rgba(0,0,0,0.8),\n    rgba(0,0,0,0.88)\n  );\n  position:absolute;\n  width:100%;\n  height:"
                        )
                        .concat(
                          e["grad-height"],
                          ";\n  left:0px;\n  bottom:0px;\n  z-index:-1;\n}\n\n#"
                        )
                        .concat(t, " #")
                        .concat(
                          t,
                          "-controls {\n  touch-action: none;\n  background-color: "
                        )
                        .concat(e["background-color"], ";\n  border: ")
                        .concat(
                          e["controls-border"],
                          ";\n  position: absolute;\n  bottom: "
                        )
                        .concat(
                          e["controls-bottom"],
                          ";\n  left: 0px;\n  width: 100%;\n  z-index:100;\n  height: 44px;\n  opacity:0;\n  display:flex;\n  border-radius: 6px;\n  align-items:center;\n  -webkit-transition: opacity 0.2s ease;\n  -moz-transition: opacity 0.2s ease;\n  transition: opacity 0.2s ease;\n}\n\n#"
                        )
                        .concat(t, " #")
                        .concat(
                          t,
                          "-totalbar {\n  width: calc(100% - 20px);\n  height: 5px;\n  margin: 0px 10px 0px 10px;\n  background-color: "
                        )
                        .concat(
                          e["totalbar-color"],
                          ";\n  position: absolute;\n  top: 0px;\n  left: 0px;\n}\n\n#"
                        )
                        .concat(t, " #")
                        .concat(
                          t,
                          "-loopbar {\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  top: 0px;\n  left: 0px;\n  background-color: "
                        )
                        .concat(e["loopbar-color"], ";\n}\n\n#")
                        .concat(t, " .")
                        .concat(t, "-loop-boundaries::before {\n  ")
                        .concat(
                          e["loopbar-boundaries-style::before"],
                          "\n\n}\n#"
                        )
                        .concat(t, " .")
                        .concat(
                          t,
                          "-loop-boundaries {\n  transform:translate(-50%,-37%);\n  position:absolute;\n  width:18px;\n  background-color:"
                        )
                        .concat(
                          e["loopbar-boundaries-color"],
                          ";\n  height:18px;\n  border-radius:10px;\n  z-index:40;\n  "
                        )
                        .concat(e["loopbar-boundaries-style"], "\n}\n\n#")
                        .concat(t, " .")
                        .concat(t, "-loop-boundaries::after {\n  ")
                        .concat(
                          e["loopbar-boundaries-style::after"],
                          "\n\n}\n\n#"
                        )
                        .concat(t, " #")
                        .concat(
                          t,
                          "-helperbar {\n  position: absolute;\n  height: 20px;\n  top: -10px;\n  left: 0px;\n  right: 0px;\n  z-index:2;\n}\n\n#"
                        )
                        .concat(t, " #")
                        .concat(
                          t,
                          "-runningbar {\n  position: relative;\n  width: 0px;\n  max-width:100%;\n  height: 100%;\n  background-color: "
                        )
                        .concat(e["runningbar-color"], ";\n}\n\n#")
                        .concat(t, " #")
                        .concat(
                          t,
                          "-cursor {\n  transform:translate(50%,-36%);\n  right: 0px;\n  overflow:hidden;\n  top: 0px;\n  width: 0px;\n  height: 0px;\n  position: absolute;\n  background-color: "
                        )
                        .concat(
                          e["cursor-color"],
                          ";\n  border-radius: 10px;\n  z-index: 5;\n}\n\n#"
                        )
                        .concat(t, " #")
                        .concat(t, "-cursor::before {\n  ")
                        .concat(e["cursor-style::before"], "\n}\n\n#")
                        .concat(t, " #")
                        .concat(t, "-cursor::after {\n  ")
                        .concat(e["cursor-style::after"], "\n}\n\n#")
                        .concat(t, " #")
                        .concat(t, "-left-controls,#")
                        .concat(t, " #")
                        .concat(
                          t,
                          "-right-controls {\n    display: flex;\n    align-items:center;\n    height: 100%;\n    padding: 5px 5px 0px;\n}\n#"
                        )
                        .concat(t, " #")
                        .concat(
                          t,
                          "-right-controls {\n  position:absolute;\n  right:0px;\n}\n\n\n#"
                        )
                        .concat(t, " #")
                        .concat(t, "-left-controls > div,#")
                        .concat(t, " #")
                        .concat(
                          t,
                          "-right-controls > div {\n  display: inline-flex;\n  align-items:center;\n  margin:0 10px 0 10px;\n  overflow:hidden;\n}\n\n\n#"
                        )
                        .concat(t, " #")
                        .concat(
                          t,
                          "-time-display span {\n  display: table-cell;\n  vertical-align: middle;\n}\n\n#"
                        )
                        .concat(t, " #")
                        .concat(t, "-status-btn {\n  opacity: ")
                        .concat(e["button-opacity"], ";\n}\n#")
                        .concat(t, " #")
                        .concat(
                          t,
                          "-status-btn svg{\n  width:20px;\n  height:18px;\n}\n#"
                        )
                        .concat(t, " #")
                        .concat(t, "-volume {\n  opacity: ")
                        .concat(
                          e["button-opacity"],
                          ";\n  position: relative;\n}\n#"
                        )
                        .concat(t, " #")
                        .concat(
                          t,
                          "-volume-btn {\n  width: 20px;\n  height: 15px;\n}\n\n#"
                        )
                        .concat(t, " #")
                        .concat(
                          t,
                          "-volumebar {\n  width: 0px;\n  height: 3px;\n  background-color: "
                        )
                        .concat(
                          e["loopbar-color"],
                          ";\n  -webkit-transition: left 0.1s ease;\n  -moz-transition: left 0.1s ease;\n  transition: left 0.1s ease;\n  position:relative;\n  left:5px;\n}\n\n#"
                        )
                        .concat(t, " #")
                        .concat(
                          t,
                          "-volumebar-helper {\n  position: absolute;\n    width: 0px;\n    height: 15px;\n    bottom: 0px;\n    z-index: 10;\n    left: 25px;\n}\n\n#"
                        )
                        .concat(t, " #")
                        .concat(
                          t,
                          "-volumebar-active {\n  position: relative;\n  width: 0%;\n  height: 100%;\n  background-color: "
                        )
                        .concat(
                          e.color,
                          ";\n  position:relative;\n  bottom:0px;\n}\n\n#"
                        )
                        .concat(t, " #")
                        .concat(
                          t,
                          "-volume-cursor {\n  transform:translate(50%,-36%);\n  right: 0px;\n  top: 0px;\n  width: 0px;\n  height: 0px;\n  position: absolute;\n  background-color: "
                        )
                        .concat(
                          e.color,
                          ";\n  border-radius: 10px;\n  z-index: 5;\n}\n\n#"
                        )
                        .concat(t, " .")
                        .concat(
                          t,
                          "-loopbar-time {\n  width:auto;\n  height:12px;\n  background-color:"
                        )
                        .concat(
                          e["background-color"],
                          ";\n  line-height:10px;\n  font-size:10px;\n}\n\n#"
                        )
                        .concat(t, " #")
                        .concat(t, "-loop-time {\n  margin: 7px;\n}\n\n#")
                        .concat(t, " #")
                        .concat(
                          t,
                          "-dc-btn {\n    background-repeat: no-repeat;\n    background-size: 100% 100%;\n    width: 20px;\n    height: 15px;\n    margin: 7px 10px 5px 0px;\n    transform: scale(1.5,1.5);\n}\n\n#"
                        )
                        .concat(t, " #")
                        .concat(t, "-loop-btn {\n  opacity: ")
                        .concat(
                          e["button-opacity"],
                          ";\n  display:flex;\n  align-items:center;\n}\n\n\n#"
                        )
                        .concat(t, " #")
                        .concat(
                          t,
                          "-settings-btn {\n  overflow:hidden;\n  opacity: "
                        )
                        .concat(e["button-opacity"], ";\n}\n\n#")
                        .concat(t, " #")
                        .concat(t, "-full-screen-btn {\n  opacity: ")
                        .concat(e["button-opacity"], ";\n}\n\n#")
                        .concat(t, " .")
                        .concat(t, "-speed-btn {\n  opacity: ")
                        .concat(
                          e["button-opacity"],
                          ";\n  height: 14px;\n}\n\n#"
                        )
                        .concat(t, " #")
                        .concat(
                          t,
                          "-settings-panel {\n  touch-action: none;\n  box-sizing: border-box;\n  position: absolute;\n  z-index:102;\n  background-color: "
                        )
                        .concat(e["settings-background-color"], ";\n  bottom: ")
                        .concat(e["settings-panel-bottom"], ";\n  border: ")
                        .concat(
                          e.border,
                          ";\n  right: 8px;\n  width: 167px;\n  padding: 5px;\n  margin: 0px;\n  -webkit-transition: all 0.3s ease;\n  -moz-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n}\n\n#"
                        )
                        .concat(t, " .")
                        .concat(
                          t,
                          "-hide {\n  display:none !important;\n}\n\n#"
                        )
                        .concat(t, " #")
                        .concat(
                          t,
                          "-speed-value-bar {\n  position: relative;\n  width: 5px;\n  background-color: "
                        )
                        .concat(
                          e["speedbar-color"],
                          ";\n  display: inline-block;\n  box-sizing: border-box;\n  height: "
                        )
                        .concat(
                          16 * n.speedValues.length,
                          "px;\n  float: left;\n  margin-right:15px;\n}\n\n#"
                        )
                        .concat(t, " #")
                        .concat(
                          t,
                          "-speed-value-helperbar {\n  position: absolute;\n  width: 25px;\n  height: "
                        )
                        .concat(
                          16 * n.speedValues.length,
                          "px;\n  float: left;\n  left: 18px;\n  z-index:10;\n}\n\n\n#"
                        )
                        .concat(t, " #")
                        .concat(t, "-speed-value-bar:hover,\n#")
                        .concat(t, " #")
                        .concat(
                          t,
                          "-speed-value-helperbar {\n  cursor: pointer;\n}\n\n#"
                        )
                        .concat(t, " #")
                        .concat(t, "-volumebar:hover,\n#")
                        .concat(t, " #")
                        .concat(t, "-volumebar-helper:hover,\n#")
                        .concat(t, " #")
                        .concat(t, "-volume-btn:hover,\n#")
                        .concat(t, " #")
                        .concat(t, "-volumebar:active,\n#")
                        .concat(t, " #")
                        .concat(t, "-volumebar-helper:active,\n#")
                        .concat(t, " #")
                        .concat(
                          t,
                          "-volume-btn:active {\n  cursor:pointer;\n}\n\n#"
                        )
                        .concat(t, " #")
                        .concat(
                          t,
                          "-speed-cursor {\n  position: absolute;\n  background-color: "
                        )
                        .concat(
                          e["speedbar-cursor-color"],
                          ";\n  top: 0px;\n  left: 0px;\n}\n\n#"
                        )
                        .concat(t, " #")
                        .concat(
                          t,
                          "-speed-cursor div {\n  position: absolute;\n  background-color: "
                        )
                        .concat(
                          e["speedbar-cursor-color"],
                          ";\n  left: -2.5px;\n  top: -4px;\n  width: 10px;\n  height: 10px;\n  border-radius: 5px;\n}\n\n#"
                        )
                        .concat(t, " #")
                        .concat(t, "-time-separator{\n  margin:0 3px;\n}\n#")
                        .concat(t, " #")
                        .concat(
                          t,
                          "-speed-cursor:hover {\n  cursor: pointer;\n}\n\n#"
                        )
                        .concat(t, " .")
                        .concat(
                          t,
                          "-speed-value-step {\n  width: 16px;\n  background-color: "
                        )
                        .concat(
                          e["speedbar-color"],
                          ";\n  display: inline-block;\n  box-sizing: border-box;\n  height: 2px;\n  margin-top: 7px;\n  margin-bottom: 7px;\n  float: left;\n}\n\n#"
                        )
                        .concat(t, " #")
                        .concat(
                          t,
                          "-speed-value {\n  display: inline-block;\n  box-sizing: border-box;\n  height: "
                        )
                        .concat(
                          16 * n.speedValues.length,
                          "px;\n  text-align: left;\n}\n\n#"
                        )
                        .concat(t, " .")
                        .concat(
                          t,
                          "-speed-value {\n  box-sizing: border-box;\n  height: 16px;\n  font-size: 12px;\n}\n\n#"
                        )
                        .concat(t, " #")
                        .concat(
                          t,
                          "-indicator {\n  font-size: 8px !important;\n  position: absolute;\n  bottom: -3px;\n  color: "
                        )
                        .concat(e.color, ";\n}\n\n\n#")
                        .concat(t, " #")
                        .concat(t, "-speed-settings li.no-hover { \n  height: ")
                        .concat(
                          16 * n.speedValues.length + 10 - 2,
                          "px !important; \n}\n\n#"
                        )
                        .concat(t, " #")
                        .concat(t, "-settings-panel.")
                        .concat(
                          t,
                          "-settings-speed-panel {\n  overflow: hidden;\n  width: 92px;\n  position:absolute;\n  z-index:120;\n  /*height: "
                        )
                        .concat(
                          16 * n.speedValues.length + 32 + 20,
                          "px;*/\n  -webkit-transition: all 0.3s ease;\n  -moz-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n}\n\n#"
                        )
                        .concat(t, " #")
                        .concat(t, "-settings-panel.")
                        .concat(t, "-settings-speed-panel .")
                        .concat(t, "-speed-btn {\n  float: left;\n}\n\n#")
                        .concat(t, " .")
                        .concat(
                          t,
                          "-settings-speed-panel ul:first-child {\n  text-align: right;\n}\n\n#"
                        )
                        .concat(t, " #")
                        .concat(
                          t,
                          "-speed-current {\n  float: right;\n  padding-right: 10px\n}\n\n#"
                        )
                        .concat(t, " #")
                        .concat(t, "-settings-panel .")
                        .concat(t, "-speed-btn {\n  float: right;\n}\n\n#")
                        .concat(t, " #")
                        .concat(
                          t,
                          "-settings-panel ul {\n  width: 100%;\n  margin: 0px;\n  padding: 0px;\n  overflow: hidden;\n}\n\n#"
                        )
                        .concat(t, " #")
                        .concat(t, "-settings-panel.")
                        .concat(
                          t,
                          "-settings-speed-panel ul li {\n  min-width: 70px;\n  display: flex;\n  height: 32px;\n  align-items: center;\n  justify-content:center;\n}\n\n#"
                        )
                        .concat(t, " #")
                        .concat(
                          t,
                          "-settings-panel ul li.no-hover:hover {\n  background-color: transparent;\n  cursor: default;\n}\n\n#"
                        )
                        .concat(t, " div.")
                        .concat(t, "-speed-value:hover {\n  background-color: ")
                        .concat(
                          e["hover-color"],
                          ";\n  cursor: pointer;\n}\n\n#"
                        )
                        .concat(t, " #")
                        .concat(
                          t,
                          "-settings-panel ul li {\n  /*position: relative;\n  width: 100%;\n  min-width: 154px;*/\n  list-style-type: none;\n  margin: 0px;\n  padding: 5px;\n  display: flex;\n  height:32px;\n  align-items:center;\n}\n\n#"
                        )
                        .concat(t, " #")
                        .concat(
                          t,
                          "-settings-panel ul li label {\n  margin: 0px;\n}\n\n#"
                        )
                        .concat(
                          t,
                          " .switch {\n  position: relative;\n  display: inline-block;\n  width: 32px;\n  height: 18px;\n}\n\n#"
                        )
                        .concat(t, " .switch input {\n  display: none;\n}\n\n#")
                        .concat(
                          t,
                          " .settings-switch {\n  position: absolute;\n  right: 24px;\n}\n\n#"
                        )
                        .concat(
                          t,
                          " .settings-switch::after {\n  clear: both;\n}\n\n#"
                        )
                        .concat(
                          t,
                          " .slider {\n  position: absolute;\n  cursor: pointer;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: "
                        )
                        .concat(
                          e["slider-off-color"],
                          ";\n  -webkit-transition: .4s;\n  transition: .4s;\n}\n\n#"
                        )
                        .concat(
                          t,
                          ' .slider:before {\n  position: absolute;\n  content: "";\n  height: 16px;\n  width: 16px;\n  left: 1px;\n  bottom: 1px;\n  background-color: white;\n  -webkit-transition: .4s;\n  transition: .4s;\n}\n\n#'
                        )
                        .concat(
                          t,
                          " input:checked+.slider {\n  background-color: "
                        )
                        .concat(e["slider-on-color"], ";\n}\n\n#")
                        .concat(
                          t,
                          " input:focus+.slider {\n  box-shadow: 0 0 1px "
                        )
                        .concat(e["slider-on-color"], ";\n}\n\n#")
                        .concat(
                          t,
                          " input:checked+.slider:before {\n  -webkit-transform: translateX(16px);\n  -ms-transform: translateX(16px);\n  transform: translateX(16px);\n}\n\n\n/* Rounded sliders */\n\n#"
                        )
                        .concat(
                          t,
                          " .slider.round {\n  border-radius: 34px;\n}\n\n#"
                        )
                        .concat(
                          t,
                          " .slider.round:before {\n  border-radius: 50%;\n}\n\n\n#"
                        )
                        .concat(
                          t,
                          " .m-fadeOut {\n  visibility: hidden !important;\n  opacity: 0 !important;\n}\n\n#"
                        )
                        .concat(
                          t,
                          " .m-fadeIn {\n  visibility: visible !important;\n  opacity: 1 !important;\n}\n\n#"
                        )
                        .concat(t, " #")
                        .concat(
                          t,
                          "-settings-panel ul li:hover {\n  background-color: "
                        )
                        .concat(
                          e["hover-color"],
                          ";\n  cursor: pointer;\n}\n\n#"
                        )
                        .concat(t, " #")
                        .concat(
                          t,
                          "-settings-panel ul li label:hover {\n  cursor: pointer;\n}\n\n#"
                        )
                        .concat(t, " #")
                        .concat(
                          t,
                          "-loopbar:hover {\n  cursor: pointer;\n}\n\n#"
                        )
                        .concat(t, " #")
                        .concat(
                          t,
                          "-status-btn:hover {\n  cursor: pointer;\n}\n\n#"
                        )
                        .concat(t, " #")
                        .concat(t, "-controls:active #")
                        .concat(t, "-cursor,\n#")
                        .concat(t, " #")
                        .concat(t, "-controls:hover #")
                        .concat(
                          t,
                          "-cursor  {\n  width: 16px;\n  height: 16px;\n  -webkit-transition: all 0.3s ease;\n  -moz-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n}\n\n#"
                        )
                        .concat(t, " #")
                        .concat(t, "-volume .")
                        .concat(
                          t,
                          "-volume-cursor-transition {\n  width: 12px;\n  height: 12px;\n  -webkit-transition: all 0.3s ease;\n  -moz-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n}\n\n#"
                        )
                        .concat(t, " #")
                        .concat(t, "-volume .")
                        .concat(
                          t,
                          "-volume-width-transition\n {\n  width: 50px;\n  -webkit-transition: all 0.3s ease;\n  -moz-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n}\n\n#"
                        )
                        .concat(t, " #")
                        .concat(t, "-time-display.")
                        .concat(
                          t,
                          "-time-width-transition {\n  position:relative;\n  left: 10px;\n  -webkit-transition: left 0.3s ease;\n  -moz-transition: left 0.3s ease;\n  transition: left 0.3s ease;\n}\n\n#"
                        )
                        .concat(t, " #")
                        .concat(t, "-settings-speed:hover .")
                        .concat(
                          t,
                          "-speed-btn {\n  opacity: 1;\n  -webkit-transition: all 0.3s ease;\n  -moz-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n}\n\n#"
                        )
                        .concat(t, " #")
                        .concat(
                          t,
                          "-status-btn:hover {\n  opacity: 1;\n  -webkit-transition: all 0.3s ease;\n  -moz-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n}\n\n#"
                        )
                        .concat(t, " #")
                        .concat(t, "-loop-btn:hover,\n#")
                        .concat(t, " #")
                        .concat(
                          t,
                          "-dc-btn:hover\n {\n  cursor: pointer;\n  opacity: 1;\n  -webkit-transition: all 0.3s ease;\n  -moz-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n}\n#"
                        )
                        .concat(t, " #")
                        .concat(
                          t,
                          "-settings-btn:hover {\n  cursor: pointer;\n  opacity: 1;\n  -webkit-transition: all 0.3s ease;\n  -moz-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n}\n\n#"
                        )
                        .concat(t, " #")
                        .concat(
                          t,
                          "-full-screen-btn:hover {\n  cursor: pointer;\n  opacity: 1;\n  -webkit-transition: all 0.3s ease;\n  -moz-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n}\n"
                        )
                        .concat(e["theme-style"], "\n");
                    })(e, this.name, this.options),
                    i = pe("style");
                  (i.id = this.name + "-style"),
                    i.styleSheet
                      ? (i.styleSheet.cssText = s)
                      : i.appendChild(document.createTextNode(s)),
                    ce("head")[0].appendChild(i),
                    this.eventBroadcast("theme-change", this.options.theme);
                },
              },
              {
                key: "setSpeed",
                value: function () {
                  var e,
                    t = this;
                  (e = 1 == this.clip.speed ? "Normal" : this.clip.speed),
                    (this.elements.speedCurrent.innerHTML = e);
                  var n =
                    -1 *
                    ((function () {
                      for (var e = 0; e < t.options.speedValues.length - 1; e++)
                        if (
                          t.options.speedValues[e] <= t.clip.speed &&
                          t.options.speedValues[e + 1] > t.clip.speed
                        )
                          return (
                            e +
                            Math.abs(
                              (t.clip.speed - t.options.speedValues[e]) /
                                (t.options.speedValues[e] -
                                  t.options.speedValues[e + 1])
                            )
                          );
                    })() *
                      (1 / (this.options.speedValues.length - 1)) -
                      1) *
                    (this.options.speedValues.length - 1) *
                    16;
                  re("".concat(this.name, "-speed-cursor")).style.top =
                    n + "px";
                },
              },
              {
                key: "calculateSpeed",
                value: function (e, t, n) {
                  var o = Math.floor(n / e);
                  if (o === t.length - 1) return t[o].toFixed(1);
                  var s = (
                    ((n / e) % 1) * Math.abs(t[o] - t[o + 1]) +
                    t[o]
                  ).toFixed(1);
                  return 0 == s ? "0.0" : s;
                },
              },
              {
                key: "createPreviewDisplay",
                value: function () {
                  this.previewClip = this.clip.paste(
                    re("".concat(this.name, "-hover-display-clip"))
                  );
                  var e = re("".concat(this.name, "-hover-display"));
                  (window.previewClip = this.previewClip),
                    (e.style.position = "absolute"),
                    (e.style.background = this.options.backgroundColor),
                    (e.style.zIndex = 1),
                    this.setPreviewDimentions();
                },
              },
              {
                key: "setPreviewDimentions",
                value: function () {
                  var e = this.clip.props.host,
                    t = this.previewClip.ownClip.props.host,
                    n = e.offsetWidth,
                    o = e.offsetHeight,
                    s = n * this.previewScale;
                  s > 300 && ((s = 300), (this.previewScale = s / n));
                  var i = n * this.previewScale,
                    a = o * this.previewScale,
                    l = de(
                      {
                        width: this.clip.props.containerParams.width,
                        height: this.clip.props.containerParams.height,
                      },
                      { width: i, height: a },
                      "cover" === this.options.scaleToFit
                    );
                  (this.previewClip.ownClip.rootElement.style.transform = "scale(".concat(
                    l.scale
                  )),
                    (this.previewClip.ownClip.rootElement.style.left =
                      l.position.left + "px"),
                    (this.previewClip.ownClip.rootElement.style.top =
                      l.position.top + "px"),
                    (re("".concat(this.name, "-hover-display")).style.width =
                      i + "px"),
                    (re("".concat(this.name, "-hover-display")).style.height =
                      a + "px"),
                    (t.style.boxSizing = "border-box");
                },
              },
            ]) && s(t.prototype, n),
            o && s(t, o),
            e
          );
        })();
      });

      /***/
    },
    /* 2 */
    /***/ function (module, exports, __webpack_require__) {
      var __WEBPACK_AMD_DEFINE_FACTORY__,
        __WEBPACK_AMD_DEFINE_ARRAY__,
        __WEBPACK_AMD_DEFINE_RESULT__;
      function _typeof(obj) {
        "@babel/helpers - typeof";
        if (
          typeof Symbol === "function" &&
          typeof Symbol.iterator === "symbol"
        ) {
          _typeof = function _typeof(obj) {
            return typeof obj;
          };
        } else {
          _typeof = function _typeof(obj) {
            return obj &&
              typeof Symbol === "function" &&
              obj.constructor === Symbol &&
              obj !== Symbol.prototype
              ? "symbol"
              : typeof obj;
          };
        }
        return _typeof(obj);
      }

      !(function (A, V) {
        "object" == (false ? undefined : _typeof(exports)) &&
        "undefined" != typeof module
          ? (module.exports = V(__webpack_require__(0)))
          : true
          ? !((__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)]),
            (__WEBPACK_AMD_DEFINE_FACTORY__ = V),
            (__WEBPACK_AMD_DEFINE_RESULT__ =
              typeof __WEBPACK_AMD_DEFINE_FACTORY__ === "function"
                ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(
                    exports,
                    __WEBPACK_AMD_DEFINE_ARRAY__
                  )
                : __WEBPACK_AMD_DEFINE_FACTORY__),
            __WEBPACK_AMD_DEFINE_RESULT__ !== undefined &&
              (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
          : undefined;
      })(this, function (A) {
        "use strict";

        function V(A, V) {
          if (!(A instanceof V))
            throw new TypeError("Cannot call a class as a function");
        }

        function i(A, V) {
          for (var i = 0; i < V.length; i++) {
            var t = V[i];
            (t.enumerable = t.enumerable || !1),
              (t.configurable = !0),
              "value" in t && (t.writable = !0),
              Object.defineProperty(A, t.key, t);
          }
        }

        function t(A, V, t) {
          return V && i(A.prototype, V), t && i(A, t), A;
        }

        function o(A, V) {
          if ("function" != typeof V && null !== V)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (A.prototype = Object.create(V && V.prototype, {
            constructor: {
              value: A,
              writable: !0,
              configurable: !0,
            },
          })),
            V && Q(A, V);
        }

        function E(A) {
          return (E = Object.setPrototypeOf
            ? Object.getPrototypeOf
            : function (A) {
                return A.__proto__ || Object.getPrototypeOf(A);
              })(A);
        }

        function Q(A, V) {
          return (Q =
            Object.setPrototypeOf ||
            function (A, V) {
              return (A.__proto__ = V), A;
            })(A, V);
        }

        function p(A, V) {
          return !V || ("object" != _typeof(V) && "function" != typeof V)
            ? (function (A) {
                if (void 0 === A)
                  throw new ReferenceError(
                    "this hasn't been initialised - super() hasn't been called"
                  );
                return A;
              })(A)
            : V;
        }

        function I(A) {
          var V = (function () {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;

            try {
              return (
                Date.prototype.toString.call(
                  Reflect.construct(Date, [], function () {})
                ),
                !0
              );
            } catch (A) {
              return !1;
            }
          })();

          return function () {
            var i,
              t = E(A);

            if (V) {
              var o = E(this).constructor;
              i = Reflect.construct(t, arguments, o);
            } else i = t.apply(this, arguments);

            return p(this, i);
          };
        }

        var R = {
            incidents: [
              {
                exportable: (function (A) {
                  o(E, A);
                  var i = I(E);

                  function E() {
                    return V(this, E), i.apply(this, arguments);
                  }

                  return (
                    t(E, [
                      {
                        key: "onGetContext",
                        value: function value() {
                          (this.time = 0),
                            (this.canvasContext = this.element.getContext(
                              "2d"
                            ));
                        },
                      },
                      {
                        key: "onProgress",
                        value: function value(A, V) {
                          var i = Math.round(V / 20);

                          if (i !== this.time) {
                            this.time = i;

                            for (
                              var t = this.canvasContext.createImageData(
                                  this.element.width,
                                  this.element.height
                                ),
                                o = t.data,
                                E = 0,
                                Q = o.length;
                              E < Q;
                              E += 12
                            ) {
                              var p =
                                6 +
                                Math.sin(
                                  E / 6e4 +
                                    (this.time % this.element.height) / 10
                                );
                              (o[E] = o[E + 1] = o[E + 2] = o[E + 3] = o[
                                E + 4
                              ] = 40 * Math.random() * p),
                                (o[E + 5] = 255);
                            }

                            this.canvasContext.putImageData(t, 0, 0);
                          }
                        },
                      },
                    ]),
                    E
                  );
                })(A.Effect),
                name: "NoiseEffect",
              },
            ],
          },
          h = A.loadPlugin(R),
          U = (function (i) {
            o(Q, i);
            var E = I(Q);

            function Q() {
              return V(this, Q), E.apply(this, arguments);
            }

            return (
              t(Q, [
                {
                  key: "buildTree",
                  value: function value() {
                    var V = this.attrs.duration,
                      i = new h.NoiseEffect(
                        {
                          animatedAttrs: {
                            canvasImage: "dynamic",
                          },
                        },
                        {
                          selector: "#tv",
                          duration: V,
                        }
                      );

                    if ((this.addIncident(i, 0), !0 === this.attrs.sound)) {
                      for (var t = 0; t < this.attrs.duration - 4e3; t += 4e3) {
                        var o = new A.AudioPlayback({
                          selector: "~#static",
                          duration: 4e3,
                        });
                        this.addIncident(o, 4e3 * t);
                      }

                      var E = this.attrs.duration % 4e3,
                        Q = new A.AudioPlayback({
                          selector: "~#static",
                          duration: E,
                        });
                      this.addIncident(Q, this.attrs.duration - E);
                    }
                  },
                },
                {
                  key: "html",
                  get: function get() {
                    return '\n      <div class="bg"> \n          <canvas id="tv" width="'
                      .concat(this.attrs.width, '" height="')
                      .concat(
                        this.attrs.height,
                        '"></canvas>\n      </div>\n    '
                      );
                  },
                },
                {
                  key: "css",
                  get: function get() {
                    return "\n      .bg{\n          background: black;\n      }\n    ";
                  },
                },
                {
                  key: "audioSources",
                  get: function get() {
                    return [
                      {
                        src:
                          "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BEZ5+KP6hG2ikTjROhaBMPgsISCTZGQCoZEfUShA4mUGNGIGjYgmdeoBiBtIv+/1//3uCEa1/KxRu037fM7ftmd//+12oJy/0394u9mWZ/CSjQsw/2ZqmjkgAIBOGpE4eJ0LQbD40VQSbRkBMGjPqJhiRMxToKLRjEyk6QQgukb/f7//36CENG5jYi+s3///b9v/v//y9Ilzcz3xj93H+Mm00+U/ZF3jN2zrMez2NCS6cGQf5gkaJkSsl99v83pgw4NiihbF/oWGCouOFE/80JbAzGWs0SCeCMt//mPJLGRy8nAjl6pcP/zLAqjFcpjIkOgsDYcCUzEb2Vb///MYClMeARMakJNPDtMHCQCwA9+rze////wKJBkeYRh8QZjQB5hmLRgaGQD/+pQAkaHrD2LYP1rZ6TLgWmeLWz0jXAoc8WwUkwABSyAt8pJgAIbrNbLuOOv////MTilMXTGCFeM3FtMCQCMGgbMPSmMBQyu41qHHmVb/////MRxGMSxWQLMJA9MNAfEICGCIHDoDmBgdmJQY91/73/////////iMNLgJBwxHGr/gsZraxuFGOjOf5kh4mf6Bbhr/PU7Y9XuqGCv8wKQDLqUdqP/5zfuGgGmZCSkESq7/+btfhq7CntpjQf//5hGNGRUEULMyUaSEN1ZTe7l///maCaZ9mBkpTmnA2adihg8iY1st6y////Myng0msjBABMTlQyeMrAUIONytnr8v////NWQcQDU0Y4zml5MdJE0MLTCYwMQli7S3KGU2M9f////5lcZGFwkCAmYYAZg8dGBw8Dg8YJFQEA5ICv1r//9a///////zDYaMDiwx6ODGIy/4tUxBTUUzLjkyIChhbHBoYSlVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+pQA5UDrgAbNTcgGd6AA0gm5EM5wAAAAAaQcAAAAAAA0g4AAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=",
                        base64: !0,
                        id: "static",
                      },
                    ];
                  },
                },
              ]),
              Q
            );
          })(A.HTMLClip),
          B = {
            name: "Image Canvas Clip and various Effects",
            Clip: {
              exportable: (function (A) {
                o(E, A);
                var i = I(E);

                function E() {
                  return V(this, E), i.apply(this, arguments);
                }

                return (
                  t(E, [
                    {
                      key: "onAfterRender",
                      value: function value() {
                        var A = this;
                        this.contextLoading();
                        var V = this.context.getElements("canvas")[0],
                          i = V.getContext("2d");
                        this.setCustomEntity("canvas", i);
                        var t = new Image();
                        (t.onload = function () {
                          (A.context.image = t),
                            i.drawImage(
                              t,
                              0,
                              0,
                              t.width,
                              t.height,
                              0,
                              0,
                              V.width,
                              V.height
                            ),
                            A.contextLoaded();
                        }),
                          (t.src = this.attrs.imgUrl);
                      },
                    },
                    {
                      key: "html",
                      get: function get() {
                        return '<canvas width="'
                          .concat(
                            parseInt(this.props.containerParams.width),
                            '" height="'
                          )
                          .concat(
                            parseInt(this.props.containerParams.height),
                            '"></canvas>'
                          );
                      },
                    },
                  ]),
                  E
                );
              })(A.BrowserClip),
              attributesValidationRules: {
                imgUrl: {
                  type: "string",
                },
              },
            },
          },
          K = A.loadPlugin(B);

        return {
          npm_name: "@kissmybutton/motorcortex-tv",
          version: "0.0.1",
          incidents: [
            {
              exportable: U,
              name: "TVNoise",
              attributesValidationRules: {
                duration: {
                  optional: !1,
                  type: "number",
                  min: 1,
                },
                width: {
                  optional: !1,
                  type: "number",
                  min: 1,
                },
                height: {
                  optional: !1,
                  type: "number",
                  min: 1,
                },
                sound: {
                  optional: !0,
                  type: "boolean",
                },
              },
            },
            {
              exportable: (function (A) {
                o(E, A);
                var i = I(E);

                function E() {
                  return V(this, E), i.apply(this, arguments);
                }

                return (
                  t(E, [
                    {
                      key: "buildTree",
                      value: function value() {
                        var A = new K.Clip(
                          {
                            imgUrl: this.attrs.imgUrl,
                          },
                          {
                            selector: "#canvasClipContainer",
                            containerParams: this.props.containerParams,
                          }
                        );
                        this.addIncident(A, 0);
                      },
                    },
                    {
                      key: "html",
                      get: function get() {
                        return '<div id="canvasClipContainer"></div>';
                      },
                    },
                    {
                      key: "css",
                      get: function get() {
                        return "\n      #canvasClipContainer{\n          width: "
                          .concat(
                            this.props.containerParams.width,
                            ";\n          height: "
                          )
                          .concat(
                            this.props.containerParams.height,
                            ";\n      }\n    "
                          );
                      },
                    },
                  ]),
                  E
                );
              })(A.HTMLClip),
              name: "ImageGlitch",
              attributesValidationRules: {
                imgUrl: {
                  type: "string",
                  optional: !1,
                },
              },
            },
          ],
        };
      });

      /***/
    },
    /* 3 */
    /***/ function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      __webpack_require__.r(__webpack_exports__);
      /* harmony import */ var _kissmybutton_motorcortex_player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        1
      );
      /* harmony import */ var _kissmybutton_motorcortex_player__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
        _kissmybutton_motorcortex_player__WEBPACK_IMPORTED_MODULE_0__
      );
      /* harmony import */ var _kissmybutton_motorcortex___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
        0
      );
      /* harmony import */ var _kissmybutton_motorcortex___WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __webpack_require__.n(
        _kissmybutton_motorcortex___WEBPACK_IMPORTED_MODULE_1__
      );
      /* harmony import */ var _dist_motorcortex_tv_umd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
        2
      );
      /* harmony import */ var _dist_motorcortex_tv_umd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/ __webpack_require__.n(
        _dist_motorcortex_tv_umd__WEBPACK_IMPORTED_MODULE_2__
      );

      var TVPlugin = Object(
        _kissmybutton_motorcortex___WEBPACK_IMPORTED_MODULE_1__["loadPlugin"]
      )(_dist_motorcortex_tv_umd__WEBPACK_IMPORTED_MODULE_2___default.a);
      var myClip = new _kissmybutton_motorcortex___WEBPACK_IMPORTED_MODULE_1__[
        "HTMLClip"
      ]({
        html:
          '\n    <div>\n      <div id="container"></div>\n      <div id="glitchContainer"></div>\n    </div>    \n  ',
        css:
          "\n    #container, #glitchContainer{\n      width: 800px;\n      height: 600px;\n    }\n  ",
        host: document.getElementById("clip"),
        containerParams: {
          width: "800px",
          height: "1200px",
        },
      });
      var tvNoise = new TVPlugin.TVNoise(
        {
          width: 800,
          height: 600,
          duration: 6000,
          sound: true,
        },
        {
          selector: "#container",
        }
      );
      var imageGlitch = new TVPlugin.ImageGlitch(
        {
          imgUrl:
            "https://images.hdqwalls.com/wallpapers/minimal-sunset-landscape-4k-w5.jpg",
        },
        {
          selector: "#glitchContainer",
          containerParams: {
            width: "800px",
            height: "600px",
          },
        }
      );
      myClip.addIncident(tvNoise, 0);
      myClip.addIncident(imageGlitch, 0);
      new _kissmybutton_motorcortex_player__WEBPACK_IMPORTED_MODULE_0___default.a(
        {
          clip: myClip,
        }
      );

      /***/
    },
    /* 4 */
    /***/ function (module, exports) {
      /***/
    },
    /* 5 */
    /***/ function (module, exports, __webpack_require__) {
      /* WEBPACK VAR INJECTION */ (function (process) {
        // .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
        // backported and transplited with Babel, with backwards-compat fixes

        // Copyright Joyent, Inc. and other Node contributors.
        //
        // Permission is hereby granted, free of charge, to any person obtaining a
        // copy of this software and associated documentation files (the
        // "Software"), to deal in the Software without restriction, including
        // without limitation the rights to use, copy, modify, merge, publish,
        // distribute, sublicense, and/or sell copies of the Software, and to permit
        // persons to whom the Software is furnished to do so, subject to the
        // following conditions:
        //
        // The above copyright notice and this permission notice shall be included
        // in all copies or substantial portions of the Software.
        //
        // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
        // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
        // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
        // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
        // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
        // USE OR OTHER DEALINGS IN THE SOFTWARE.

        // resolves . and .. elements in a path array with directory names there
        // must be no slashes, empty elements, or device names (c:\) in the array
        // (so also no leading and trailing slashes - it does not distinguish
        // relative and absolute paths)
        function normalizeArray(parts, allowAboveRoot) {
          // if the path tries to go above the root, `up` ends up > 0
          var up = 0;
          for (var i = parts.length - 1; i >= 0; i--) {
            var last = parts[i];
            if (last === ".") {
              parts.splice(i, 1);
            } else if (last === "..") {
              parts.splice(i, 1);
              up++;
            } else if (up) {
              parts.splice(i, 1);
              up--;
            }
          }

          // if the path is allowed to go above the root, restore leading ..s
          if (allowAboveRoot) {
            for (; up--; up) {
              parts.unshift("..");
            }
          }

          return parts;
        }

        // path.resolve([from ...], to)
        // posix version
        exports.resolve = function () {
          var resolvedPath = "",
            resolvedAbsolute = false;

          for (
            var i = arguments.length - 1;
            i >= -1 && !resolvedAbsolute;
            i--
          ) {
            var path = i >= 0 ? arguments[i] : process.cwd();

            // Skip empty and invalid entries
            if (typeof path !== "string") {
              throw new TypeError("Arguments to path.resolve must be strings");
            } else if (!path) {
              continue;
            }

            resolvedPath = path + "/" + resolvedPath;
            resolvedAbsolute = path.charAt(0) === "/";
          }

          // At this point the path should be resolved to a full absolute path, but
          // handle relative paths to be safe (might happen when process.cwd() fails)

          // Normalize the path
          resolvedPath = normalizeArray(
            filter(resolvedPath.split("/"), function (p) {
              return !!p;
            }),
            !resolvedAbsolute
          ).join("/");

          return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
        };

        // path.normalize(path)
        // posix version
        exports.normalize = function (path) {
          var isAbsolute = exports.isAbsolute(path),
            trailingSlash = substr(path, -1) === "/";

          // Normalize the path
          path = normalizeArray(
            filter(path.split("/"), function (p) {
              return !!p;
            }),
            !isAbsolute
          ).join("/");

          if (!path && !isAbsolute) {
            path = ".";
          }
          if (path && trailingSlash) {
            path += "/";
          }

          return (isAbsolute ? "/" : "") + path;
        };

        // posix version
        exports.isAbsolute = function (path) {
          return path.charAt(0) === "/";
        };

        // posix version
        exports.join = function () {
          var paths = Array.prototype.slice.call(arguments, 0);
          return exports.normalize(
            filter(paths, function (p, index) {
              if (typeof p !== "string") {
                throw new TypeError("Arguments to path.join must be strings");
              }
              return p;
            }).join("/")
          );
        };

        // path.relative(from, to)
        // posix version
        exports.relative = function (from, to) {
          from = exports.resolve(from).substr(1);
          to = exports.resolve(to).substr(1);

          function trim(arr) {
            var start = 0;
            for (; start < arr.length; start++) {
              if (arr[start] !== "") break;
            }

            var end = arr.length - 1;
            for (; end >= 0; end--) {
              if (arr[end] !== "") break;
            }

            if (start > end) return [];
            return arr.slice(start, end - start + 1);
          }

          var fromParts = trim(from.split("/"));
          var toParts = trim(to.split("/"));

          var length = Math.min(fromParts.length, toParts.length);
          var samePartsLength = length;
          for (var i = 0; i < length; i++) {
            if (fromParts[i] !== toParts[i]) {
              samePartsLength = i;
              break;
            }
          }

          var outputParts = [];
          for (var i = samePartsLength; i < fromParts.length; i++) {
            outputParts.push("..");
          }

          outputParts = outputParts.concat(toParts.slice(samePartsLength));

          return outputParts.join("/");
        };

        exports.sep = "/";
        exports.delimiter = ":";

        exports.dirname = function (path) {
          if (typeof path !== "string") path = path + "";
          if (path.length === 0) return ".";
          var code = path.charCodeAt(0);
          var hasRoot = code === 47; /*/*/
          var end = -1;
          var matchedSlash = true;
          for (var i = path.length - 1; i >= 1; --i) {
            code = path.charCodeAt(i);
            if (code === 47 /*/*/) {
              if (!matchedSlash) {
                end = i;
                break;
              }
            } else {
              // We saw the first non-path separator
              matchedSlash = false;
            }
          }

          if (end === -1) return hasRoot ? "/" : ".";
          if (hasRoot && end === 1) {
            // return '//';
            // Backwards-compat fix:
            return "/";
          }
          return path.slice(0, end);
        };

        function basename(path) {
          if (typeof path !== "string") path = path + "";

          var start = 0;
          var end = -1;
          var matchedSlash = true;
          var i;

          for (i = path.length - 1; i >= 0; --i) {
            if (path.charCodeAt(i) === 47 /*/*/) {
              // If we reached a path separator that was not part of a set of path
              // separators at the end of the string, stop now
              if (!matchedSlash) {
                start = i + 1;
                break;
              }
            } else if (end === -1) {
              // We saw the first non-path separator, mark this as the end of our
              // path component
              matchedSlash = false;
              end = i + 1;
            }
          }

          if (end === -1) return "";
          return path.slice(start, end);
        }

        // Uses a mixed approach for backwards-compatibility, as ext behavior changed
        // in new Node.js versions, so only basename() above is backported here
        exports.basename = function (path, ext) {
          var f = basename(path);
          if (ext && f.substr(-1 * ext.length) === ext) {
            f = f.substr(0, f.length - ext.length);
          }
          return f;
        };

        exports.extname = function (path) {
          if (typeof path !== "string") path = path + "";
          var startDot = -1;
          var startPart = 0;
          var end = -1;
          var matchedSlash = true;
          // Track the state of characters (if any) we see before our first dot and
          // after any path separator we find
          var preDotState = 0;
          for (var i = path.length - 1; i >= 0; --i) {
            var code = path.charCodeAt(i);
            if (code === 47 /*/*/) {
              // If we reached a path separator that was not part of a set of path
              // separators at the end of the string, stop now
              if (!matchedSlash) {
                startPart = i + 1;
                break;
              }
              continue;
            }
            if (end === -1) {
              // We saw the first non-path separator, mark this as the end of our
              // extension
              matchedSlash = false;
              end = i + 1;
            }
            if (code === 46 /*.*/) {
              // If this is our first dot, mark it as the start of our extension
              if (startDot === -1) startDot = i;
              else if (preDotState !== 1) preDotState = 1;
            } else if (startDot !== -1) {
              // We saw a non-dot and non-path separator before our dot, so we should
              // have a good chance at having a non-empty extension
              preDotState = -1;
            }
          }

          if (
            startDot === -1 ||
            end === -1 ||
            // We saw a non-dot character immediately before the dot
            preDotState === 0 ||
            // The (right-most) trimmed path component is exactly '..'
            (preDotState === 1 &&
              startDot === end - 1 &&
              startDot === startPart + 1)
          ) {
            return "";
          }
          return path.slice(startDot, end);
        };

        function filter(xs, f) {
          if (xs.filter) return xs.filter(f);
          var res = [];
          for (var i = 0; i < xs.length; i++) {
            if (f(xs[i], i, xs)) res.push(xs[i]);
          }
          return res;
        }

        // String.prototype.substr - negative index don't work in IE8
        var substr =
          "ab".substr(-1) === "b"
            ? function (str, start, len) {
                return str.substr(start, len);
              }
            : function (str, start, len) {
                if (start < 0) start = str.length + start;
                return str.substr(start, len);
              };

        /* WEBPACK VAR INJECTION */
      }.call(this, __webpack_require__(6)));

      /***/
    },
    /* 6 */
    /***/ function (module, exports) {
      // shim for using process in browser
      var process = (module.exports = {});

      // cached from whatever global is present so that test runners that stub it
      // don't break things.  But we need to wrap it in a try catch in case it is
      // wrapped in strict mode code which doesn't define any globals.  It's inside a
      // function because try/catches deoptimize in certain engines.

      var cachedSetTimeout;
      var cachedClearTimeout;

      function defaultSetTimout() {
        throw new Error("setTimeout has not been defined");
      }
      function defaultClearTimeout() {
        throw new Error("clearTimeout has not been defined");
      }
      (function () {
        try {
          if (typeof setTimeout === "function") {
            cachedSetTimeout = setTimeout;
          } else {
            cachedSetTimeout = defaultSetTimout;
          }
        } catch (e) {
          cachedSetTimeout = defaultSetTimout;
        }
        try {
          if (typeof clearTimeout === "function") {
            cachedClearTimeout = clearTimeout;
          } else {
            cachedClearTimeout = defaultClearTimeout;
          }
        } catch (e) {
          cachedClearTimeout = defaultClearTimeout;
        }
      })();
      function runTimeout(fun) {
        if (cachedSetTimeout === setTimeout) {
          //normal enviroments in sane situations
          return setTimeout(fun, 0);
        }
        // if setTimeout wasn't available but was latter defined
        if (
          (cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) &&
          setTimeout
        ) {
          cachedSetTimeout = setTimeout;
          return setTimeout(fun, 0);
        }
        try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedSetTimeout(fun, 0);
        } catch (e) {
          try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
          } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
          }
        }
      }
      function runClearTimeout(marker) {
        if (cachedClearTimeout === clearTimeout) {
          //normal enviroments in sane situations
          return clearTimeout(marker);
        }
        // if clearTimeout wasn't available but was latter defined
        if (
          (cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) &&
          clearTimeout
        ) {
          cachedClearTimeout = clearTimeout;
          return clearTimeout(marker);
        }
        try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedClearTimeout(marker);
        } catch (e) {
          try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
          } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
          }
        }
      }
      var queue = [];
      var draining = false;
      var currentQueue;
      var queueIndex = -1;

      function cleanUpNextTick() {
        if (!draining || !currentQueue) {
          return;
        }
        draining = false;
        if (currentQueue.length) {
          queue = currentQueue.concat(queue);
        } else {
          queueIndex = -1;
        }
        if (queue.length) {
          drainQueue();
        }
      }

      function drainQueue() {
        if (draining) {
          return;
        }
        var timeout = runTimeout(cleanUpNextTick);
        draining = true;

        var len = queue.length;
        while (len) {
          currentQueue = queue;
          queue = [];
          while (++queueIndex < len) {
            if (currentQueue) {
              currentQueue[queueIndex].run();
            }
          }
          queueIndex = -1;
          len = queue.length;
        }
        currentQueue = null;
        draining = false;
        runClearTimeout(timeout);
      }

      process.nextTick = function (fun) {
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) {
          for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
          }
        }
        queue.push(new Item(fun, args));
        if (queue.length === 1 && !draining) {
          runTimeout(drainQueue);
        }
      };

      // v8 likes predictible objects
      function Item(fun, array) {
        this.fun = fun;
        this.array = array;
      }
      Item.prototype.run = function () {
        this.fun.apply(null, this.array);
      };
      process.title = "browser";
      process.browser = true;
      process.env = {};
      process.argv = [];
      process.version = ""; // empty string to avoid regexp issues
      process.versions = {};

      function noop() {}

      process.on = noop;
      process.addListener = noop;
      process.once = noop;
      process.off = noop;
      process.removeListener = noop;
      process.removeAllListeners = noop;
      process.emit = noop;
      process.prependListener = noop;
      process.prependOnceListener = noop;

      process.listeners = function (name) {
        return [];
      };

      process.binding = function (name) {
        throw new Error("process.binding is not supported");
      };

      process.cwd = function () {
        return "/";
      };
      process.chdir = function (dir) {
        throw new Error("process.chdir is not supported");
      };
      process.umask = function () {
        return 0;
      };

      /***/
    },
    /******/
  ]
);
