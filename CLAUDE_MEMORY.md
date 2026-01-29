# GPRToolDemo - Claude Project Memory

**Last Updated**: 2026-01-29  
**Project Owner**: User (lotr2929)  
**Repository**: https://github.com/lotr2929/GPRToolDemo.git

---

## 🎯 PROJECT VISION
Build a **clean, efficient, and professional web application** for GPR (Green Plot Ratio) tool demonstrations. Focus on code quality, maintainability, and user experience.

---

## 📁 PROJECT STRUCTURE

```
C:\GPRToolDemo/                    # Local root directory
├── .git/                          # Git repository
├── .obsidian/
├── .run/                          
├── .venv/                         # Python virtual environment
├── backend/                       # FastAPI backend
│   ├── app.py                    # Main API server
│   ├── geometry.py               # 3D geometry generation
│   ├── exporters.py              # File export utilities
│   ├── _pycache_              
│   └── data/                     # Generated OBJ files
├── frontend/                      # Static web files
│   ├── index.html                # Main entry point
│   ├── header.html               # Header component
│   ├── body.html                 # Body component
│   ├── styles.css                # Styling
│   ├── js/                       # JavaScript modules
│   │   ├── main.js              # Main application logic
│   │   ├── camera.js            # Three.js camera controls
│   │   ├── three.module.js      # Three.js library
│   │   └── OrbitControls.js     # Camera orbit controls
│   ├── images/                   # Logo and graphics
│   └── textures/                 # 3D model textures
├── requirements.txt               # Python dependencies
├── start.bat                      # Local startup script
├── close.bat                      # Local shutdown script
├── publish.bat                    # Deployment script
└── CLAUDE_MEMORY.md              # This file
```

---

## 🚀 DEPLOYMENT STATUS

### Local Development
- **Status**: ✅ Working
- **Backend**: FastAPI server on `http://localhost:8000`
- **Frontend**: Served via FastAPI StaticFiles
- **Commands**:
  - Start: `start.bat`
  - Stop: `close.bat`   # Not working

### Production (Render)
- **Status**: ✅ Deployed and Working
- **URL**: https://gprtooldemo.onrender.com/
- **Service**: Render web service
- **Deploy**: `publish.bat` (pushes to GitHub, triggers Render)

---

## 🛠️ TECHNOLOGY STACK

### Backend
- **FastAPI**: Web framework
- **Uvicorn**: ASGI server
- **Python 3.x**: Runtime

### Frontend
- **Three.js**: 3D visualization
- **Vanilla JavaScript**: ES6 modules
- **HTML5/CSS3**: Modern web standards

### Tools
- **Git**: Version control
- **GitHub**: Remote repository
- **Render**: Cloud hosting
- **Windows Batch Scripts**: Local automation

---

## 🔑 KEY FEATURES

1. **3D Box Generation**: Create parametric boxes with custom dimensions
2. **OBJ Export**: Generate downloadable .obj files
3. **Real-time 3D Preview**: Interactive Three.js visualization
4. **API-First Design**: RESTful backend architecture
5. **Static File Serving**: Efficient frontend delivery

---

## 📝 DEVELOPMENT PRINCIPLES

### Code Quality
- ✅ Clean, readable code
- ✅ Minimal dependencies
- ✅ Well-organized file structure
- ✅ Clear separation of concerns

### Efficiency
- ✅ Fast response times
- ✅ Optimized asset delivery
- ✅ Minimal overhead

### Maintainability
- ✅ Modular architecture
- ✅ Clear naming conventions
- ✅ Documentation where needed

---

## 🔄 CURRENT WORKFLOW

1. **Local Development**:
   - Edit files in `C:\GPRToolDemo`
   - Test with `start.bat`
   - Stop with `close.bat`

2. **Deployment**:
   - Run `publish.bat` to push to GitHub
   - Render auto-deploys from GitHub

3. **Claude's Role**:
   - Read this memory file at session start
   - Track all changes and progress
   - Maintain code quality standards
   - Suggest improvements
   - Document new features

---

## 📊 API ENDPOINTS

### Health Check
- **GET** `/api/health`
- Returns: `{"ok": true}`

### Generate Box
- **GET** `/api/box?l=20&w=30&h=40`
- Parameters:
  - `l`: Length (default: 20)
  - `w`: Width (default: 30)
  - `h`: Height (default: 40)
- Returns: `{"obj": "/download/box.obj"}`

### Download File
- **GET** `/download/{name}`
- Returns: File content

---

## 🎨 FRONTEND COMPONENTS

### HTML Files
- `index.html`: Main page with component includes
- `header.html`: Navigation and branding
- `body.html`: Main content area

### JavaScript Modules
- `main.js`: Application initialization and API calls
- `camera.js`: Three.js scene setup and rendering
- `three.module.js`: Three.js library
- `OrbitControls.js`: Interactive camera controls

---

## ⚙️ CONFIGURATION FILES

### requirements.txt
```txt
fastapi
uvicorn[standard]
```

### .gitignore
- Node modules, Python cache, virtual environments
- IDE files, OS files, logs
- Environment variables

---

## 📋 NEXT STEPS & TODO

_[This section will be updated as we progress]_

### Immediate Tasks
- [ ] _To be discussed_

### Future Enhancements
- [ ] _To be planned_

---

## 🐛 KNOWN ISSUES

_[None currently documented]_

---

## 💡 NOTES FOR CLAUDE

1. **Always read this file** at the start of each session
2. **Update this file** when significant changes are made
3. **Track progress** in the "Next Steps" section
4. **Document issues** as they arise
5. **Maintain the vision**: Clean, efficient, professional code
6. **Ask questions** if anything is unclear about the project state
7. **Suggest improvements** proactively based on best practices

---

## 📞 QUICK REFERENCE

- **Local Root**: `C:\GPRToolDemo`
- **GitHub**: `https://github.com/lotr2929/GPRToolDemo.git`
- **Branch**: `main`
- **Backend Port**: 8000
- **Frontend**: Served by FastAPI
- **Python**: Virtual environment in `.venv/`

---

**Remember**: The goal is to build something clean, efficient, and maintainable. Quality over quantity. Every change should improve the codebase.
