import { useState, useRef } from 'react';
import { Download, RefreshCw, Wand2, Sliders, Image as ImageIcon, ArrowLeft, Upload, X, Check } from 'lucide-react';

interface StagingEditorProps {
  originalImage: string;
  stagedImage: string;
  onRegenerate: (room: string, style: string) => void;
  onBack?: () => void;
}

const roomTypes = ['Living Room', 'Bedroom', 'Kitchen', 'Home Office', 'Outdoor', 'Dining Room'];
const styles = ['Original', 'Modern', 'Midcentury', 'Scandinavian', 'Luxury', 'Coastal', 'Farmhouse'];

export function StagingEditor({ originalImage, stagedImage, onRegenerate, onBack }: StagingEditorProps) {
  const [selectedRoom, setSelectedRoom] = useState('Living Room');
  const [selectedStyle, setSelectedStyle] = useState('Luxury');
  const [showOriginal, setShowOriginal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleRegenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      onRegenerate(selectedRoom, selectedStyle);
      setIsGenerating(false);
    }, 2000);
  };

  const handleDownload = () => {
    const imageToDownload = uploadedImage || (showOriginal ? originalImage : stagedImage);
    const link = document.createElement('a');
    link.href = imageToDownload;
    link.download = 'staged-image.jpg';
    link.click();
  };

  const processFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }

      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        setTimeout(() => {
          setUploadedImage(e.target?.result as string);
          setIsUploading(false);
          setUploadSuccess(true);
          setTimeout(() => setUploadSuccess(false), 2000);
        }, 800);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const currentImage = uploadedImage || (showOriginal ? originalImage : stagedImage);
  const hasImage = uploadedImage || originalImage;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {onBack && (
          <button
            onClick={onBack}
            className="mb-6 inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-all duration-300 hover:translate-x-[-4px] group"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:translate-x-[-2px]" />
            <span>Back to Home</span>
          </button>
        )}
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transition-shadow duration-300 hover:shadow-2xl">
          <div className="grid lg:grid-cols-3 gap-6 p-4 lg:p-6">
            {/* Main Image Area */}
            <div className="lg:col-span-2 space-y-4">
              {/* Upload Zone */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 lg:p-6 border-2 border-dashed transition-all duration-300 ${
                  isDragging
                    ? 'border-blue-500 bg-blue-100 scale-[1.02]'
                    : uploadSuccess
                    ? 'border-green-500 bg-green-50'
                    : 'border-blue-300 hover:border-blue-400 hover:shadow-md'
                }`}
              >
                {isUploading && (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center z-10">
                    <div className="flex flex-col items-center space-y-3">
                      <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
                      <p className="text-sm text-gray-600">Processing image...</p>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg transition-all duration-300 ${
                      uploadSuccess ? 'bg-green-100' : 'bg-blue-100'
                    }`}>
                      {uploadSuccess ? (
                        <Check className="w-5 h-5 text-green-600" />
                      ) : (
                        <Upload className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-gray-900 text-sm lg:text-base">
                        {uploadedImage ? 'Upload Another Image' : 'Upload Your Own Image'}
                      </h3>
                      <p className="text-xs lg:text-sm text-gray-600 mt-1">
                        {isDragging
                          ? 'Drop your image here...'
                          : 'Drag & drop or click to browse (JPG, PNG up to 10MB)'}
                      </p>
                    </div>
                  </div>
                  <label className="cursor-pointer group">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 active:scale-95 transition-all duration-200 text-sm whitespace-nowrap shadow-md hover:shadow-lg group-hover:translate-y-[-2px]">
                      Choose File
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <h2 className="text-gray-900 text-lg lg:text-xl">
                  {uploadedImage ? 'Your Uploaded Image' : 'Your Staged Image'}
                </h2>
                <div className="flex gap-2 w-full sm:w-auto">
                  {!uploadedImage && (
                    <button
                      onClick={() => setShowOriginal(!showOriginal)}
                      className="flex-1 sm:flex-none px-3 lg:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 active:scale-95 transition-all duration-200 inline-flex items-center justify-center space-x-2 text-sm lg:text-base hover:shadow-md"
                    >
                      <ImageIcon className="w-4 h-4" />
                      <span className="hidden sm:inline">{showOriginal ? 'Show Staged' : 'Show Original'}</span>
                      <span className="sm:hidden">{showOriginal ? 'Staged' : 'Original'}</span>
                    </button>
                  )}
                  {uploadedImage && (
                    <button
                      onClick={handleRemoveImage}
                      className="flex-1 sm:flex-none px-3 lg:px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 active:scale-95 transition-all duration-200 inline-flex items-center justify-center space-x-2 text-sm lg:text-base hover:shadow-md"
                    >
                      <X className="w-4 h-4" />
                      <span>Remove</span>
                    </button>
                  )}
                  <button
                    onClick={handleDownload}
                    disabled={!hasImage}
                    className="flex-1 sm:flex-none bg-blue-600 text-white px-3 lg:px-4 py-2 rounded-lg hover:bg-blue-700 active:scale-95 transition-all duration-200 inline-flex items-center justify-center space-x-2 text-sm lg:text-base shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:translate-y-[-2px]"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>

              {/* Image Display Area */}
              <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-inner">
                {hasImage ? (
                  <img
                    src={currentImage}
                    alt="Staging result"
                    className="w-full h-auto transition-all duration-500 ease-out"
                    style={{
                      filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`,
                    }}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center py-24 lg:py-32 px-4">
                    <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-6 rounded-full mb-6 animate-pulse">
                      <ImageIcon className="w-16 h-16 text-blue-600" />
                    </div>
                    <h3 className="text-xl lg:text-2xl text-gray-900 mb-2">No Image Yet</h3>
                    <p className="text-gray-600 text-center text-sm lg:text-base mb-6 max-w-md">
                      Upload an image above to get started with AI-powered virtual staging
                    </p>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 active:scale-95 transition-all duration-200 inline-flex items-center space-x-2 shadow-lg hover:shadow-xl hover:translate-y-[-2px]"
                    >
                      <Upload className="w-5 h-5" />
                      <span>Upload Your First Image</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Image Adjustments */}
              {hasImage && (
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 lg:p-6 space-y-4 border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Sliders className="w-5 h-5 text-gray-600" />
                      <h3 className="text-gray-900 text-base lg:text-lg">Image Adjustments</h3>
                    </div>
                    <button
                      onClick={() => {
                        setBrightness(100);
                        setContrast(100);
                        setSaturation(100);
                      }}
                      className="text-blue-600 hover:text-blue-700 text-xs lg:text-sm hover:underline transition-all duration-200"
                    >
                      Reset All
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="group">
                      <div className="flex justify-between mb-2">
                        <label className="text-xs lg:text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                          Brightness
                        </label>
                        <span className="text-xs lg:text-sm text-gray-900 font-medium">{brightness}%</span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="150"
                        value={brightness}
                        onChange={(e) => setBrightness(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider transition-all duration-200"
                      />
                    </div>

                    <div className="group">
                      <div className="flex justify-between mb-2">
                        <label className="text-xs lg:text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                          Contrast
                        </label>
                        <span className="text-xs lg:text-sm text-gray-900 font-medium">{contrast}%</span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="150"
                        value={contrast}
                        onChange={(e) => setContrast(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider transition-all duration-200"
                      />
                    </div>

                    <div className="group">
                      <div className="flex justify-between mb-2">
                        <label className="text-xs lg:text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                          Saturation
                        </label>
                        <span className="text-xs lg:text-sm text-gray-900 font-medium">{saturation}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="200"
                        value={saturation}
                        onChange={(e) => setSaturation(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Settings Panel */}
            <div className="space-y-4 lg:space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 lg:p-6 border border-blue-100 shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="bg-blue-600 p-1.5 rounded-lg">
                    <Wand2 className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-gray-900 text-base lg:text-lg">Staging Settings</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs lg:text-sm text-gray-700 mb-2">
                      Room Type
                    </label>
                    <select
                      value={selectedRoom}
                      onChange={(e) => setSelectedRoom(e.target.value)}
                      className="w-full px-3 lg:px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm lg:text-base transition-all duration-200 hover:border-blue-400 bg-white shadow-sm"
                    >
                      {roomTypes.map((room) => (
                        <option key={room} value={room}>
                          {room}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs lg:text-sm text-gray-700 mb-2">
                      Design Style
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {styles.map((style) => (
                        <button
                          key={style}
                          onClick={() => setSelectedStyle(style)}
                          className={`px-2 lg:px-3 py-2 rounded-lg text-xs lg:text-sm transition-all duration-200 active:scale-95 ${
                            selectedStyle === style
                              ? 'bg-blue-600 text-white shadow-md scale-105'
                              : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:shadow-sm'
                          }`}
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleRegenerate}
                    disabled={isGenerating || !hasImage}
                    className="w-full bg-blue-600 text-white px-4 lg:px-6 py-3 rounded-lg hover:bg-blue-700 active:scale-95 transition-all duration-200 inline-flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm lg:text-base shadow-md hover:shadow-lg hover:translate-y-[-2px]"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        <span>Regenerating...</span>
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-5 h-5" />
                        <span>Regenerate</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Tips Section */}
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-4 lg:p-6 border border-yellow-200 shadow-sm transition-all duration-300 hover:shadow-md">
                <h4 className="text-gray-900 mb-3 text-sm lg:text-base flex items-center space-x-2">
                  <span className="text-xl">💡</span>
                  <span>Pro Tips</span>
                </h4>
                <ul className="space-y-2.5 text-xs lg:text-sm text-gray-700">
                  <li className="flex items-start space-x-2 group">
                    <span className="text-yellow-600 mt-1 transition-transform group-hover:scale-125">•</span>
                    <span className="group-hover:text-gray-900 transition-colors">Use well-lit photos for best results</span>
                  </li>
                  <li className="flex items-start space-x-2 group">
                    <span className="text-yellow-600 mt-1 transition-transform group-hover:scale-125">•</span>
                    <span className="group-hover:text-gray-900 transition-colors">Make sure the room is completely empty</span>
                  </li>
                  <li className="flex items-start space-x-2 group">
                    <span className="text-yellow-600 mt-1 transition-transform group-hover:scale-125">•</span>
                    <span className="group-hover:text-gray-900 transition-colors">Try different styles to see what works best</span>
                  </li>
                  <li className="flex items-start space-x-2 group">
                    <span className="text-yellow-600 mt-1 transition-transform group-hover:scale-125">•</span>
                    <span className="group-hover:text-gray-900 transition-colors">Download high-resolution images for listings</span>
                  </li>
                </ul>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 lg:gap-4">
                <div className="bg-white rounded-lg p-3 lg:p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-2px]">
                  <div className="text-xl lg:text-2xl text-blue-600 transition-all duration-300">2.4s</div>
                  <div className="text-xs lg:text-sm text-gray-600">Processing Time</div>
                </div>
                <div className="bg-white rounded-lg p-3 lg:p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-2px]">
                  <div className="text-xl lg:text-2xl text-green-600 transition-all duration-300">98%</div>
                  <div className="text-xs lg:text-sm text-gray-600">Accuracy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
