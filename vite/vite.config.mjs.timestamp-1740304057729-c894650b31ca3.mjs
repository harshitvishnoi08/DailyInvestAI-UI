// vite.config.mjs
import { defineConfig } from "file:///D:/DailyInvestAI-UI/vite/node_modules/vite/dist/node/index.js";
import react from "file:///D:/DailyInvestAI-UI/vite/node_modules/@vitejs/plugin-react/dist/index.js";
import jsconfigPaths from "file:///D:/DailyInvestAI-UI/vite/node_modules/vite-jsconfig-paths/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react(), jsconfigPaths()],
  // https://github.com/jpuri/react-draft-wysiwyg/issues/1317
  base: "/free",
  define: {
    global: "window"
  },
  resolve: {
    // alias: [
    //   {
    //     find: /^~(.+)/,
    //     replacement: path.join(process.cwd(), 'node_modules/$1')
    //   },
    //   {
    //     find: /^src(.+)/,
    //     replacement: path.join(process.cwd(), 'src/$1')
    //   }
    // ]
  },
  server: {
    // this ensures that the browser opens upon server start
    open: true,
    // this sets a default port to 3000
    port: 3e3
  },
  preview: {
    // this ensures that the browser opens upon preview start
    open: true,
    // this sets a default port to 3000
    port: 3e3
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubWpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcRGFpbHlJbnZlc3RBSS1VSVxcXFx2aXRlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxEYWlseUludmVzdEFJLVVJXFxcXHZpdGVcXFxcdml0ZS5jb25maWcubWpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9EYWlseUludmVzdEFJLVVJL3ZpdGUvdml0ZS5jb25maWcubWpzXCI7Ly8gaHR0cHM6Ly9naXRodWIuY29tL3ZpdGVqcy92aXRlL2Rpc2N1c3Npb25zLzM0NDhcclxuLy8gaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xyXG5pbXBvcnQganNjb25maWdQYXRocyBmcm9tICd2aXRlLWpzY29uZmlnLXBhdGhzJztcclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW3JlYWN0KCksIGpzY29uZmlnUGF0aHMoKV0sXHJcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2pwdXJpL3JlYWN0LWRyYWZ0LXd5c2l3eWcvaXNzdWVzLzEzMTdcclxuICBiYXNlOiAnL2ZyZWUnLFxyXG4gIGRlZmluZToge1xyXG4gICAgZ2xvYmFsOiAnd2luZG93J1xyXG4gIH0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgLy8gYWxpYXM6IFtcclxuICAgIC8vICAge1xyXG4gICAgLy8gICAgIGZpbmQ6IC9efiguKykvLFxyXG4gICAgLy8gICAgIHJlcGxhY2VtZW50OiBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ25vZGVfbW9kdWxlcy8kMScpXHJcbiAgICAvLyAgIH0sXHJcbiAgICAvLyAgIHtcclxuICAgIC8vICAgICBmaW5kOiAvXnNyYyguKykvLFxyXG4gICAgLy8gICAgIHJlcGxhY2VtZW50OiBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ3NyYy8kMScpXHJcbiAgICAvLyAgIH1cclxuICAgIC8vIF1cclxuICB9LFxyXG4gIHNlcnZlcjoge1xyXG4gICAgLy8gdGhpcyBlbnN1cmVzIHRoYXQgdGhlIGJyb3dzZXIgb3BlbnMgdXBvbiBzZXJ2ZXIgc3RhcnRcclxuICAgIG9wZW46IHRydWUsXHJcbiAgICAvLyB0aGlzIHNldHMgYSBkZWZhdWx0IHBvcnQgdG8gMzAwMFxyXG4gICAgcG9ydDogMzAwMFxyXG4gIH0sXHJcbiAgcHJldmlldzoge1xyXG4gICAgLy8gdGhpcyBlbnN1cmVzIHRoYXQgdGhlIGJyb3dzZXIgb3BlbnMgdXBvbiBwcmV2aWV3IHN0YXJ0XHJcbiAgICBvcGVuOiB0cnVlLFxyXG4gICAgLy8gdGhpcyBzZXRzIGEgZGVmYXVsdCBwb3J0IHRvIDMwMDBcclxuICAgIHBvcnQ6IDMwMDBcclxuICB9XHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBRUEsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sbUJBQW1CO0FBSTFCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLEdBQUcsY0FBYyxDQUFDO0FBQUE7QUFBQSxFQUVsQyxNQUFNO0FBQUEsRUFDTixRQUFRO0FBQUEsSUFDTixRQUFRO0FBQUEsRUFDVjtBQUFBLEVBQ0EsU0FBUztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFXVDtBQUFBLEVBQ0EsUUFBUTtBQUFBO0FBQUEsSUFFTixNQUFNO0FBQUE7QUFBQSxJQUVOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxTQUFTO0FBQUE7QUFBQSxJQUVQLE1BQU07QUFBQTtBQUFBLElBRU4sTUFBTTtBQUFBLEVBQ1I7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
