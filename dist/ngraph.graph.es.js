function Q(t) {
  Z(t);
  const i = X(t);
  return t.on = i.on, t.off = i.off, t.fire = i.fire, t;
}
function X(t) {
  let i = /* @__PURE__ */ Object.create(null);
  return {
    on: function(o, f, h) {
      if (typeof f != "function")
        throw new Error("callback is expected to be a function");
      let c = i[o];
      return c || (c = i[o] = []), c.push({ callback: f, ctx: h }), t;
    },
    off: function(o, f) {
      if (typeof o > "u")
        return i = /* @__PURE__ */ Object.create(null), t;
      if (i[o])
        if (typeof f != "function")
          delete i[o];
        else {
          const l = i[o];
          for (let p = 0; p < l.length; ++p)
            l[p].callback === f && l.splice(p, 1);
        }
      return t;
    },
    fire: function(o) {
      const f = i[o];
      if (!f)
        return t;
      let h;
      arguments.length > 1 && (h = Array.prototype.slice.call(arguments, 1));
      for (let c = 0; c < f.length; ++c) {
        const l = f[c];
        l.callback.apply(l.ctx, h);
      }
      return t;
    }
  };
}
function Z(t) {
  if (!t)
    throw new Error("Eventify cannot use falsy object as events subject");
  const i = ["on", "fire", "off"];
  for (let o = 0; o < i.length; ++o)
    if (t.hasOwnProperty(i[o]))
      throw new Error("Subject cannot be eventified, since it already has property '" + i[o] + "'");
}
function $(t) {
  if (t = t || {}, "uniqueLinkId" in t && (console.warn(
    "ngraph.graph: Starting from version 0.14 `uniqueLinkId` is deprecated.\nUse `multigraph` option instead\n",
    `
`,
    `Note: there is also change in default behavior: From now on each graph
is considered to be not a multigraph by default (each edge is unique).`
  ), t.multigraph = t.uniqueLinkId), t.multigraph === void 0 && (t.multigraph = !1), typeof Map != "function")
    throw new Error("ngraph.graph requires `Map` to be defined. Please polyfill it before using ngraph");
  var i = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), f = {}, h = 0, c = t.multigraph ? P : T, l = [], p = y, w = y, k = y, L = y, g = {
    /**
     * Sometimes duck typing could be slow. Giving clients a hint about data structure
     * via explicit version number here:
     */
    version: 20,
    /**
     * Adds node to the graph. If node with given id already exists in the graph
     * its data is extended with whatever comes in 'data' argument.
     *
     * @param nodeId the node's identifier. A string or number is preferred.
     * @param [data] additional data for the node being added. If node already
     *   exists its data object is augmented with the new one.
     *
     * @return {node} The newly added node or node with given id if it already exists.
     */
    addNode: N,
    /**
     * Adds a link to the graph. The function always create a new
     * link between two nodes. If one of the nodes does not exists
     * a new node is created.
     *
     * @param fromId link start node id;
     * @param toId link end node id;
     * @param [data] additional data to be set on the new link;
     *
     * @return {link} The newly created link
     */
    addLink: R,
    /**
     * Removes link from the graph. If link does not exist does nothing.
     *
     * @param link - object returned by addLink() or getLinks() methods.
     *
     * @returns true if link was removed; false otherwise.
     */
    removeLink: G,
    /**
     * Removes node with given id from the graph. If node does not exist in the graph
     * does nothing.
     *
     * @param nodeId node's identifier passed to addNode() function.
     *
     * @returns true if node was removed; false otherwise.
     */
    removeNode: C,
    /**
     * Gets node with given identifier. If node does not exist undefined value is returned.
     *
     * @param nodeId requested node identifier;
     *
     * @return {node} in with requested identifier or undefined if no such node exists.
     */
    getNode: s,
    /**
     * Gets number of nodes in this graph.
     *
     * @return number of nodes in the graph.
     */
    getNodeCount: S,
    /**
     * Gets total number of links in the graph.
     */
    getLinkCount: x,
    /**
     * Synonym for `getLinkCount()`
     */
    getEdgeCount: x,
    /**
     * Synonym for `getLinkCount()`
     */
    getLinksCount: x,
    /**
     * Synonym for `getNodeCount()`
     */
    getNodesCount: S,
    /**
     * Gets all links (inbound and outbound) from the node with given id.
     * If node with given id is not found null is returned.
     *
     * @param nodeId requested node identifier.
     *
     * @return Set of links from and to requested node if such node exists;
     *   otherwise null is returned.
     */
    getLinks: z,
    /**
     * Invokes callback on each node of the graph.
     *
     * @param {Function(node)} callback Function to be invoked. The function
     *   is passed one argument: visited node.
     */
    forEachNode: M,
    /**
     * Invokes callback on every linked (adjacent) node to the given one.
     *
     * @param nodeId Identifier of the requested node.
     * @param {Function(node, link)} callback Function to be called on all linked nodes.
     *   The function is passed two parameters: adjacent node and link object itself.
     * @param oriented if true graph treated as oriented.
     */
    forEachLinkedNode: Y,
    /**
     * Enumerates all links in the graph
     *
     * @param {Function(link)} callback Function to be called on all links in the graph.
     *   The function is passed one parameter: graph's link object.
     *
     * Link object contains at least the following fields:
     *  fromId - node id where link starts;
     *  toId - node id where link ends,
     *  data - additional data passed to graph.addLink() method.
     */
    forEachLink: W,
    /**
     * Suspend all notifications about graph changes until
     * endUpdate is called.
     */
    beginUpdate: k,
    /**
     * Resumes all notifications about graph changes and fires
     * graph 'changed' event in case there are any pending changes.
     */
    endUpdate: L,
    /**
     * Removes all nodes and links from the graph.
     */
    clear: V,
    /**
     * Detects whether there is a link between two nodes.
     * Operation complexity is O(n) where n - number of links of a node.
     * NOTE: this function is synonym for getLink()
     *
     * @returns link if there is one. null otherwise.
     */
    hasLink: E,
    /**
     * Detects whether there is a node with given id
     * 
     * Operation complexity is O(1)
     * NOTE: this function is synonym for getNode()
     *
     * @returns node if there is one; Falsy value otherwise.
     */
    hasNode: s,
    /**
     * Gets an edge between two nodes.
     * Operation complexity is O(n) where n - number of links of a node.
     *
     * @param {string} fromId link start identifier
     * @param {string} toId link end identifier
     *
     * @returns link if there is one; undefined otherwise.
     */
    getLink: E
  };
  return Q(g), U(), g;
  function U() {
    var e = g.on;
    g.on = n;
    function n() {
      return g.beginUpdate = k = H, g.endUpdate = L = J, p = A, w = F, g.on = e, e.apply(g, arguments);
    }
  }
  function A(e, n) {
    l.push({
      link: e,
      changeType: n
    });
  }
  function F(e, n) {
    l.push({
      node: e,
      changeType: n
    });
  }
  function N(e, n) {
    if (e === void 0)
      throw new Error("Invalid node identifier");
    k();
    var r = s(e);
    return r ? (r.data = n, w(r, "update")) : (r = new _(e, n), w(r, "add")), i.set(e, r), L(), r;
  }
  function s(e) {
    return i.get(e);
  }
  function C(e) {
    var n = s(e);
    if (!n)
      return !1;
    k();
    var r = n.links;
    return r && (r.forEach(b), n.links = null), i.delete(e), w(n, "remove"), L(), !0;
  }
  function R(e, n, r) {
    k();
    var a = s(e) || N(e), d = s(n) || N(n), u = c(e, n, r), v = o.has(u.id);
    return o.set(u.id, u), q(a, u), e !== n && q(d, u), p(u, v ? "update" : "add"), L(), u;
  }
  function T(e, n, r) {
    var a = m(e, n), d = o.get(a);
    return d ? (d.data = r, d) : new O(e, n, r, a);
  }
  function P(e, n, r) {
    var a = m(e, n), d = f.hasOwnProperty(a);
    if (d || E(e, n)) {
      d || (f[a] = 0);
      var u = "@" + ++f[a];
      a = m(e + u, n + u);
    }
    return new O(e, n, r, a);
  }
  function S() {
    return i.size;
  }
  function x() {
    return o.size;
  }
  function z(e) {
    var n = s(e);
    return n ? n.links : null;
  }
  function G(e, n) {
    return n !== void 0 && (e = E(e, n)), b(e);
  }
  function b(e) {
    if (!e || !o.get(e.id)) return !1;
    k(), o.delete(e.id);
    var n = s(e.fromId), r = s(e.toId);
    return n && n.links.delete(e), r && r.links.delete(e), p(e, "remove"), L(), !0;
  }
  function E(e, n) {
    if (!(e === void 0 || n === void 0))
      return o.get(m(e, n));
  }
  function V() {
    k(), M(function(e) {
      C(e.id);
    }), L();
  }
  function W(e) {
    if (typeof e == "function")
      for (var n = o.values(), r = n.next(); !r.done; ) {
        if (e(r.value))
          return !0;
        r = n.next();
      }
  }
  function Y(e, n, r) {
    var a = s(e);
    if (a && a.links && typeof n == "function")
      return r ? D(a.links, e, n) : B(a.links, e, n);
  }
  function B(e, n, r) {
    for (var a, d = e.values(), u = d.next(); !u.done; ) {
      var v = u.value, K = v.fromId === n ? v.toId : v.fromId;
      if (a = r(i.get(K), v), a)
        return !0;
      u = d.next();
    }
  }
  function D(e, n, r) {
    for (var a, d = e.values(), u = d.next(); !u.done; ) {
      var v = u.value;
      if (v.fromId === n && (a = r(i.get(v.toId), v), a))
        return !0;
      u = d.next();
    }
  }
  function y() {
  }
  function H() {
    h += 1;
  }
  function J() {
    h -= 1, h === 0 && l.length > 0 && (g.fire("changed", l), l.length = 0);
  }
  function M(e) {
    if (typeof e != "function")
      throw new Error("Function is expected to iterate over graph nodes. You passed " + e);
    for (var n = i.values(), r = n.next(); !r.done; ) {
      if (e(r.value))
        return !0;
      r = n.next();
    }
  }
}
function _(t, i) {
  this.id = t, this.links = null, this.data = i;
}
function q(t, i) {
  t.links ? t.links.add(i) : t.links = /* @__PURE__ */ new Set([i]);
}
function O(t, i, o, f) {
  this.fromId = t, this.toId = i, this.data = o, this.id = f;
}
function m(t, i) {
  return t.toString() + "👉 " + i.toString();
}
export {
  $ as default
};
//# sourceMappingURL=ngraph.graph.es.js.map
