function X(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var C, U;
function Z() {
  if (U) return C;
  U = 1, C = function(i) {
    f(i);
    var a = t(i);
    return i.on = a.on, i.off = a.off, i.fire = a.fire, i;
  };
  function t(u) {
    var i = /* @__PURE__ */ Object.create(null);
    return {
      on: function(a, h, c) {
        if (typeof h != "function")
          throw new Error("callback is expected to be a function");
        var v = i[a];
        return v || (v = i[a] = []), v.push({ callback: h, ctx: c }), u;
      },
      off: function(a, h) {
        var c = typeof a > "u";
        if (c)
          return i = /* @__PURE__ */ Object.create(null), u;
        if (i[a]) {
          var v = typeof h != "function";
          if (v)
            delete i[a];
          else
            for (var g = i[a], l = 0; l < g.length; ++l)
              g[l].callback === h && g.splice(l, 1);
        }
        return u;
      },
      fire: function(a) {
        var h = i[a];
        if (!h)
          return u;
        var c;
        arguments.length > 1 && (c = Array.prototype.splice.call(arguments, 1));
        for (var v = 0; v < h.length; ++v) {
          var g = h[v];
          g.callback.apply(g.ctx, c);
        }
        return u;
      }
    };
  }
  function f(u) {
    if (!u)
      throw new Error("Eventify cannot use falsy object as events subject");
    for (var i = ["on", "fire", "off"], a = 0; a < i.length; ++a)
      if (u.hasOwnProperty(i[a]))
        throw new Error("Subject cannot be eventified, since it already has property '" + i[a] + "'");
  }
  return C;
}
var $ = Z();
const j = /* @__PURE__ */ X($);
function ee(t) {
  if (t = t || {}, "uniqueLinkId" in t && (console.warn(
    "ngraph.graph: Starting from version 0.14 `uniqueLinkId` is deprecated.\nUse `multigraph` option instead\n",
    `
`,
    `Note: there is also change in default behavior: From now on each graph
is considered to be not a multigraph by default (each edge is unique).`
  ), t.multigraph = t.uniqueLinkId), t.multigraph === void 0 && (t.multigraph = !1), typeof Map != "function")
    throw new Error("ngraph.graph requires `Map` to be defined. Please polyfill it before using ngraph");
  var f = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Map(), i = {}, a = 0, h = t.multigraph ? z : A, c = [], v = E, g = E, l = E, w = E, k = {
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
    addNode: m,
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
    addLink: b,
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
    removeNode: q,
    /**
     * Gets node with given identifier. If node does not exist undefined value is returned.
     *
     * @param nodeId requested node identifier;
     *
     * @return {node} in with requested identifier or undefined if no such node exists.
     */
    getNode: p,
    /**
     * Gets number of nodes in this graph.
     *
     * @return number of nodes in the graph.
     */
    getNodeCount: M,
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
    getNodesCount: M,
    /**
     * Gets all links (inbound and outbound) from the node with given id.
     * If node with given id is not found null is returned.
     *
     * @param nodeId requested node identifier.
     *
     * @return Set of links from and to requested node if such node exists;
     *   otherwise null is returned.
     */
    getLinks: D,
    /**
     * Invokes callback on each node of the graph.
     *
     * @param {Function(node)} callback Function to be invoked. The function
     *   is passed one argument: visited node.
     */
    forEachNode: O,
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
    beginUpdate: l,
    /**
     * Resumes all notifications about graph changes and fires
     * graph 'changed' event in case there are any pending changes.
     */
    endUpdate: w,
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
    hasLink: y,
    /**
     * Detects whether there is a node with given id
     * 
     * Operation complexity is O(1)
     * NOTE: this function is synonym for getNode()
     *
     * @returns node if there is one; Falsy value otherwise.
     */
    hasNode: p,
    /**
     * Gets an edge between two nodes.
     * Operation complexity is O(n) where n - number of links of a node.
     *
     * @param {string} fromId link start identifier
     * @param {string} toId link end identifier
     *
     * @returns link if there is one; undefined otherwise.
     */
    getLink: y
  };
  return j(k), F(), k;
  function F() {
    var e = k.on;
    k.on = n;
    function n() {
      return k.beginUpdate = l = J, k.endUpdate = w = K, v = P, g = T, k.on = e, e.apply(k, arguments);
    }
  }
  function P(e, n) {
    c.push({
      link: e,
      changeType: n
    });
  }
  function T(e, n) {
    c.push({
      node: e,
      changeType: n
    });
  }
  function m(e, n) {
    if (e === void 0)
      throw new Error("Invalid node identifier");
    l();
    var r = p(e);
    return r ? (r.data = n, g(r, "update")) : (r = new I(e, n), g(r, "add")), f.set(e, r), w(), r;
  }
  function p(e) {
    return f.get(e);
  }
  function q(e) {
    var n = p(e);
    if (!n)
      return !1;
    l();
    var r = n.links;
    return r && (r.forEach(S), n.links = null), f.delete(e), g(n, "remove"), w(), !0;
  }
  function b(e, n, r) {
    l();
    var o = p(e) || m(e), s = p(n) || m(n), d = h(e, n, r), L = u.has(d.id);
    return u.set(d.id, d), R(o, d), e !== n && R(s, d), v(d, L ? "update" : "add"), w(), d;
  }
  function A(e, n, r) {
    var o = N(e, n), s = u.get(o);
    return s ? (s.data = r, s) : new _(e, n, r, o);
  }
  function z(e, n, r) {
    var o = N(e, n), s = i.hasOwnProperty(o);
    if (s || y(e, n)) {
      s || (i[o] = 0);
      var d = "@" + ++i[o];
      o = N(e + d, n + d);
    }
    return new _(e, n, r, o);
  }
  function M() {
    return f.size;
  }
  function x() {
    return u.size;
  }
  function D(e) {
    var n = p(e);
    return n ? n.links : null;
  }
  function G(e, n) {
    return n !== void 0 && (e = y(e, n)), S(e);
  }
  function S(e) {
    if (!e || !u.get(e.id)) return !1;
    l(), u.delete(e.id);
    var n = p(e.fromId), r = p(e.toId);
    return n && n.links.delete(e), r && r.links.delete(e), v(e, "remove"), w(), !0;
  }
  function y(e, n) {
    if (!(e === void 0 || n === void 0))
      return u.get(N(e, n));
  }
  function V() {
    l(), O(function(e) {
      q(e.id);
    }), w();
  }
  function W(e) {
    if (typeof e == "function")
      for (var n = u.values(), r = n.next(); !r.done; ) {
        if (e(r.value))
          return !0;
        r = n.next();
      }
  }
  function Y(e, n, r) {
    var o = p(e);
    if (o && o.links && typeof n == "function")
      return r ? H(o.links, e, n) : B(o.links, e, n);
  }
  function B(e, n, r) {
    for (var o, s = e.values(), d = s.next(); !d.done; ) {
      var L = d.value, Q = L.fromId === n ? L.toId : L.fromId;
      if (o = r(f.get(Q), L), o)
        return !0;
      d = s.next();
    }
  }
  function H(e, n, r) {
    for (var o, s = e.values(), d = s.next(); !d.done; ) {
      var L = d.value;
      if (L.fromId === n && (o = r(f.get(L.toId), L), o))
        return !0;
      d = s.next();
    }
  }
  function E() {
  }
  function J() {
    a += 1;
  }
  function K() {
    a -= 1, a === 0 && c.length > 0 && (k.fire("changed", c), c.length = 0);
  }
  function O(e) {
    if (typeof e != "function")
      throw new Error("Function is expected to iterate over graph nodes. You passed " + e);
    for (var n = f.values(), r = n.next(); !r.done; ) {
      if (e(r.value))
        return !0;
      r = n.next();
    }
  }
}
function I(t, f) {
  this.id = t, this.links = null, this.data = f;
}
function R(t, f) {
  t.links ? t.links.add(f) : t.links = /* @__PURE__ */ new Set([f]);
}
function _(t, f, u, i) {
  this.fromId = t, this.toId = f, this.data = u, this.id = i;
}
function N(t, f) {
  return t.toString() + "👉 " + f.toString();
}
export {
  ee as default
};
//# sourceMappingURL=ngraph.graph.es.js.map
